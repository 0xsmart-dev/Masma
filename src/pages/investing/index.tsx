import React from 'react'
import { Grid } from '@mui/material'
import { CardInvesting } from 'src/views/ui/cards/advanced/CardInvesting'
import CoinMarketTable from 'src/views/table/TokensTable'
import { QuickTokenPurchase } from 'src/views/apps/modals'
import { useTop100Tokens } from 'src/hooks/useTop100Tokens'

const Investing = () => {
  const { tokens, loading: isFetchingTokens } = useTop100Tokens()

  return (
    <div>
      <CardInvesting />
      <Grid container justifyContent={'space-between'} spacing={2} mt={4}>
        <Grid item xs={12} sm={6} lg={8}>
          <CoinMarketTable tokens={tokens.length > 0 ? tokens : []} isFetchingTokens={isFetchingTokens} />
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <QuickTokenPurchase />
        </Grid>
      </Grid>
    </div>
  )
}

export default Investing
