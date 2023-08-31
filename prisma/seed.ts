// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-var-requires
// const { PrismaClient } = require('@prisma/client')
import { PrismaClient, ReferalStatus } from '@prisma/client'
import { ethers } from 'ethers'

import { generateUID } from '../src/lib/utils'

const prisma = new PrismaClient()

async function updateUserAvatars() {
  const imgCnt = 100
  const baseUrl = 'https://masma.s3.us-east-1.amazonaws.com'

  for (let i = 0; i < imgCnt; i++) {
    const imageUrl = `${baseUrl}/avatars/${i + 1}.png`
    await prisma.avatar.upsert({
      where: {
        url: imageUrl
      },
      update: {},
      create: {
        url: imageUrl
      }
    })
    console.log(`imageUrl: ${imageUrl} has been added`)
  }

  const users = await prisma.user.findMany({
    where: {
      avatar: null
    }
  })

  for (const user of users) {
    // Find available avatar
    const avatar = await prisma.avatar.findFirst({
      where: {
        used: false
      }
    })

    // Update user.avatar
    await prisma.user.update({
      where: {
        id: user.id
      },
      data: {
        avatar: avatar?.url
      }
    })

    // Update avatar.used
    await prisma.avatar.update({
      where: {
        id: avatar?.id
      },
      data: {
        used: true
      }
    })
  }
}

async function addReferralIds() {
  const usersWithoutReferrals = await prisma.user.findMany({
    where: {
      referalUsers: undefined
    }
  })

  for (const user of usersWithoutReferrals) {
    await prisma.referal.create({
      data: {
        userId: user.id,
        status: ReferalStatus.REJECTED,
        referredBy: undefined
      }
    })

    console.log('Referral record has been created => ', user.email)
  }

  // console.log('usersWithoutReferrals => ', usersWithoutReferrals)
}

const generateFakeNames = async () => {
  const users = await prisma.user.findMany({
    where: {
      username: null
    }
  })

  for (const user of users) {
    const fakeName = user.email.split('@')[0]
    await prisma.user.update({
      data: {
        username: fakeName
      },
      where: {
        id: user.id
      }
    })

    console.log(`Name: ${fakeName} generated for ${user.email}`)
  }
}

const generateInviteCodes = async () => {
  const users = await prisma.user.findMany({
    where: {
      inviteCode: undefined
    }
  })

  for (const user of users) {
    const inviteCode = generateUID()
    await prisma.user.update({
      data: {
        inviteCode: generateUID()
      },
      where: {
        id: user.id
      }
    })

    console.log(`Name: ${inviteCode} generated for ${user.email}`)
  }
}

const addCreatedTransfefTime = async () => {
  const transfers = await prisma.transfer.findMany({
    where: {
      createdAt: undefined
    }
  })

  for (const transfer of transfers) {
    var date = new Date()
    date.setDate(date.getDate() - 2)
    await prisma.transfer.update({
      data: {
        createdAt: date
      },
      where: {
        id: transfer.id
      }
    })

    console.log(`createdAt: ${date}`)
  }
}

async function main() {
  await updateUserAvatars()
  // await addReferralIds()
  await addReferralIds()
  await generateFakeNames()
  await generateInviteCodes()
  await addCreatedTransfefTime()
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async e => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
