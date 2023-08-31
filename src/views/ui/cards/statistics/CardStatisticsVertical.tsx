// ** MUI Import
import Grid from '@mui/material/Grid'

/**
 * ! Icons Imports:
 * ! You need to import all the icons which come from the API or from your server and then add these icons in 'icons' variable.
 * ! If you need all the icons from the library, use "import * as Icon from 'mdi-material-ui'"
 * */
import Link from 'mdi-material-ui/Link'
import CartPlus from 'mdi-material-ui/CartPlus'
import TrendingUp from 'mdi-material-ui/TrendingUp'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import WalletGiftcard from 'mdi-material-ui/WalletGiftcard'
import BriefcaseOutline from 'mdi-material-ui/BriefcaseOutline'

// ** Types Imports
import { CardStatsVerticalProps } from 'src/@core/components/card-statistics/types'

// ** Demo Components Imports
import CardStatisticsVertical from 'src/@core/components/card-statistics/card-stats-vertical'

interface Props {
  data: CardStatsVerticalProps[]
}

const icons = {
  Link,
  CartPlus,
  TrendingUp,
  CurrencyUsd,
  WalletGiftcard,
  BriefcaseOutline
}

const CardStatsVertical = ({ data }: Props) => {
  if (data) {
    return (
      <Grid container spacing={6}>
        {data.map((item: CardStatsVerticalProps, index: number) => {
          const IconTag = icons[item.icon as keyof typeof icons]

          return (
            <Grid item xs={12} sm={4} lg={2} key={index}>
              <CardStatisticsVertical {...item} icon={<IconTag />} />
            </Grid>
          )
        })}
      </Grid>
    )
  } else {
    return null
  }
}

export default CardStatsVertical
