import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text
} from '@react-email/components'
import * as React from 'react'
import { UserDataType } from 'src/context/types'

interface FollowedEmailTmpProps {
  targetUser: UserDataType
}

export const FollowedEmailTmp = ({ targetUser }: FollowedEmailTmpProps) => {
  const previewText = `${targetUser.username} followed you`

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>

      <Body style={main}>
        <Section style={main}>
          <Container style={container}>
            <Section>
              <Img src={targetUser.avatar} width='100' height='100' alt={targetUser.username} style={userImage} />
            </Section>
            <Section style={{ paddingBottom: '20px' }}>
              <Row>
                <Text style={heading}>{targetUser.username}</Text>
                <Text style={userBio}>{targetUser.bio}</Text>

                <Hr style={hr} />

                <div style={{ display: 'flex' }}>
                  <a
                    target={'_blank'}
                    style={acceptButton}
                    rel='noreferrer'
                    href={`${process.env.HOST_URL}/profile/${targetUser.profileId}`}
                  >
                    <span
                      style={{
                        color: '#ffffff',
                        fontSize: '18px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'inline-block',
                        width: '100%',
                        cursor: 'pointer',
                        paddingLeft: '5px',
                        maxWidth: '100%',
                        lineHeight: '120%',
                        textTransform: 'none',
                        padding: '10px 0'
                      }}
                    >
                      Accept
                    </span>
                  </a>
                  <a
                    target='_blank'
                    style={viewProfileButton}
                    rel='noreferrer'
                    href={`${process.env.HOST_URL}/profile/${targetUser.profileId}`}
                  >
                    <span
                      style={{
                        color: '#2f70d1',
                        fontSize: '18px',
                        textDecoration: 'none',
                        textAlign: 'center',
                        display: 'inline-block',
                        width: '100%',
                        cursor: 'pointer',
                        paddingLeft: '5px',
                        maxWidth: '100%',
                        lineHeight: '120%',
                        textTransform: 'none',
                        padding: '10px 0'
                      }}
                    >
                      View Profile
                    </span>
                  </a>
                </div>
              </Row>
            </Section>

            <Section style={{ backgroundColor: '#f2f3f3', textAlign: 'center' }}>
              <Row>
                <Text style={footer}>
                  {`© ${new Date().getFullYear()} `}
                  <Link href={process.env.HOST_URL}>Masma.</Link> All Rights Reserved
                </Text>
              </Row>
            </Section>
          </Container>
        </Section>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#ffffff',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif'
}

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  width: '580px'
}

const userImage = {
  margin: '0 auto',
  marginBottom: '16px',
  borderRadius: '50%'
}

const heading = {
  fontSize: '32px',
  lineHeight: '1.3',
  fontWeight: '550',
  color: '#3e3e3e',
  textAlign: 'center' as const
}

const userBio = {
  fontSize: '16px',
  lineHeight: '1.3',
  fontWeight: '400',
  color: '#3e3e3e',
  textAlign: 'center' as const
}

const viewProfileButton = {
  backgroundColor: '#ffffff',
  borderRadius: '50px',
  color: '#2f70d1',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '30%',
  cursor: 'pointer',
  border: '1px solid #2f70d1',
  marginLeft: '5px',
  marginRight: 'auto'
}

const acceptButton = {
  backgroundColor: '#2f70d1',
  borderRadius: '50px',
  color: '#ffffff',
  fontSize: '18px',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  width: '20%',
  cursor: 'pointer',
  border: '1px solid #2f70d1',
  marginLeft: 'auto'
}

const hr = {
  borderColor: '#cccccc',
  margin: '25px auto',
  width: '30%'
}

const footer = {
  color: '#9ca299',
  fontSize: '14px',
  marginBottom: '10px'
}

export default FollowedEmailTmp
