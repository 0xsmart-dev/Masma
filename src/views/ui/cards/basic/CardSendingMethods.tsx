import { Typography, Card, Box } from '@mui/material'
import { DotsVertical } from 'mdi-material-ui'
import React from 'react'

const CardSendingMethods = () => {

    const sendMethods = [{title: 'Send to a bank account', subTitle:'Over 90 destination countries.'},
    {title: 'Send cash for pickup', subTitle:'Over 110 destination countries.'},
    {title: 'Send an invoice', subTitle:'Customize, track, and send invoices.'},
    {title: 'Send a  digital asset', subTitle:'Choose from your favorite gift card brands and personalize it witha  message.'},
    {title: 'Send and recieve donations', subTitle:'Find support and help the community'},
    ];

  return (
    <Card sx={{width:300}}>
        <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', padding:2, marginTop:4}}>
            <Typography>More ways to send</Typography>
            <DotsVertical/>
        </Box>
        <hr style={{borderTop:'1px solid #EBEAEF'}}/>
        <Box>
            {sendMethods.map((method)=>{
                return (<Box key="method" sx={{display:'flex', margin:4, justifyContent:'space-between', alignItems:'center'}}>
                        <Box sx={{backgroundColor:"#F7F7F9",width:45, height:45, borderRadius:1, }}></Box>
                        <Box sx={{width:'90%',marginX:2}}>
                            <Typography variant='body2'>{method.title}</Typography>
                            <Typography variant='caption' sx={{fontSize:12, lineHeight:1}}>{method.subTitle}</Typography>
                        </Box>
                    </Box>)

        })}
        </Box>
        
    </Card>
  )
}

export default CardSendingMethods