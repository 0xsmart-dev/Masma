import React, {useState} from 'react'
import {Card, Box, Typography, Avatar} from "@mui/material"

type Props = {
    contacts: any
}
const CardContactSelection = (props: Props) => {
    const {contacts} = props;
    const [selectedContact, setSelected] = useState(0);

  return (
    <Box sx={{minWidth:400, width:400}}>
    <Card >
        <Box sx={{paddingX:4, paddingTop:4}}>
            <Typography variant="h6">People on 3Wallet</Typography>
        </Box>
        
        <Box>
            <hr style={{border:'1px solid #EBEAEF', margin:0}}/>

            {contacts.map((contact: any, index: any)=>{
                return(
                    <Box key={'contact'} sx={{display:'flex', padding:2, alignItems:'center', backgroundColor: `${selectedContact == index ? "#EAF8FE": null}`}} onClick={()=> setSelected(index)}>
                    <Avatar src={contact.imgSrc}></Avatar>
                    <Box sx={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%', marginX:4}}>
                    <Box>
                        <Typography>{contact.name}</Typography>
                        <Typography variant={'subtitle2'}>{contact.username}</Typography>
                    </Box>
                
                    <Typography variant="subtitle2">Today</Typography>
                </Box>
            </Box>
                )
            })}
        </Box>
        <hr  style={{borderTop:'1px solid #EBEAEF', margin:0}} />
        <Box sx={{margin:4}}>   
            <Typography>
                Can't find the right person? Try entering their email or mobile number instead.
            </Typography>

        </Box>
    </Card>
    </Box>

  )
}

export default CardContactSelection