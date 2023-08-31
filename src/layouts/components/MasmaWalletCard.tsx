import { Box, Typography } from '@mui/material'
import Image from 'next/image'
import LogImg from 'src/assets/images/LogImg.png'
import React from 'react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'
import { useAuth } from 'src/hooks/useAuth'
import { formatBalance } from 'src/lib/utils/format'

const Card = styled(motion.div)`
justifyContent:'center',
display:'flex',
alignItems:'center',
borderRadius:'16px',
width:300,
height:180,
border: solid 1px,
transition: 'background-color 0.5s ease'
`
function Card3D({ cardBackground, mobile, data }) {
  const { user, userBalance } = useAuth()

  if (mobile)
    return (
      <Box sx={{ width: '100%', perspective: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Card
          style={{
            backgroundColor: cardBackground,
            justifyContent: 'center',
            transition: 'background-color 0.5s ease',
            padding: 8,
            borderRadius: '16px',
            width: 300,
            height: 180,
            border: 'solid 1px'
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Image src={LogImg} width={30} height={30} alt='logImg' />
              <Typography sx={{ color: data.text }}>{data.name} Balance</Typography>
            </Box>
            {data.name === 'Masma' && <Typography sx={{ color: data.text }}>${formatBalance(userBalance)}</Typography>}
            {data.name === 'Investment' && <Typography sx={{ color: data.text }}>${data.value.toFixed(2)}</Typography>}
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginLeft: 2, marginTop: 6 }}>
            <Typography sx={{ color: data.text }} variant='h4'>
              ${data.value.toFixed(2)}
            </Typography>
          </Box>
        </Card>
      </Box>
    )

  return (
    <Box sx={{ width: '100%', perspective: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card
        style={{
          z: 100,
          backgroundColor: cardBackground,
          justifyContent: 'center',
          transition: 'background-color 0.5s ease',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '16px',
          width: 300,
          height: 180,
          border: 'solid 1px'
        }}
      >
        <Image src={LogImg} width={60} height={60} alt='logImg' />
      </Card>
    </Box>
  )
}

export default Card3D
