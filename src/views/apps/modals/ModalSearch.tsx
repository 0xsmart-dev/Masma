import { Box, Card, CardMedia, Modal, Skeleton, Slide, TextField, Typography } from '@mui/material'
import { Magnify, TrendingDown } from 'mdi-material-ui'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { UserDataType } from 'src/context/types'
import { searchUsers } from 'src/lib/api'
import nav from 'src/navigation/horizontal/'

interface ModalSearchProps {
  hidden: boolean
  open: boolean
  onClose: () => void
}

export const ModalSearch = ({ hidden, open, onClose }: ModalSearchProps) => {
  const routes = ['Accounts']
  const router = useRouter()
  const navArray = nav()

  const [users, setUsers] = useState<UserDataType[] | undefined>(undefined)
  const [currentSearch, setSearch] = useState('')

  useEffect(() => {
    searchUsers(currentSearch).then(res => {
      setUsers(res || [])
    })
  }, [currentSearch])

  const MobileHeader = ({ name }) => {
    if (name == 'Pages')
      return (
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 2, my: 2 }}>
            <TrendingDown />
            <Typography variant='body2' sx={{ fontSize: 14, ml: 2 }}>
              {name}
            </Typography>
          </Box>{' '}
          {name == 'Pages' && navArray.filter(item => item?.title.toLowerCase().includes(currentSearch.toLowerCase()))
            ? navArray
                .filter(item => item?.title.toLowerCase().includes(currentSearch.toLowerCase()))
                .map((item, index) => {
                  if (item.badgeContent == 'Soon') return null

                  return (
                    <Box
                      onClick={() => {
                        onClose()
                        // eslint-disable-next-line @typescript-eslint/no-misused-promises
                        router.replace(item.path)
                      }}
                      key={index}
                      sx={{
                        display: 'flex',
                        mx: 4,
                        p: 1,
                        boxShadow: 0,
                        transitionDuration: '0.2s',
                        borderRadius: '12px',
                        alignItems: 'center',
                        '&:hover': {
                          backgroundColor: '#E0E0E0'
                        }
                      }}
                    >
                      {item.title}
                    </Box>
                  )
                })
            : null}
        </>
      )

    return (
      <>
        {currentSearch == '' || name == 'Accounts' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 2, my: 2 }}>
            <TrendingDown />
            <Typography variant='body2' sx={{ fontSize: 14, ml: 2 }}>
              {name}
            </Typography>
          </Box>
        ) : null}
        {name == 'Accounts' && users !== undefined
          ? users.filter(({ username }) => {
              name.includes(currentSearch.toLowerCase())
            })
            ? users
                .filter(user => user.username.toLowerCase().includes(currentSearch.toLowerCase()))
                .map((user, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: 'flex',
                        mx: 4,
                        p: 1,
                        boxShadow: 0,
                        transitionDuration: '0.2s',
                        borderRadius: '12px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: '#E0E0E0'
                        }
                      }}
                      onClick={() => {
                        router.push(`/profile/${user?.profileId}`)
                        onClose()
                      }}
                    >
                      <CardMedia sx={{ height: 40, width: 40, borderRadius: 1 }} image={user?.avatar || ''} />
                      <Typography variant='body2' sx={{ color: '#000', fontWeight: '500', ml: 4 }}>
                        {user.username}
                      </Typography>
                    </Box>
                  )
                })
            : null
          : [...Array(10)].map((e, _id) => {
              return (
                <Box
                  key={_id}
                  sx={{
                    display: 'flex',
                    mx: 4,
                    p: 1,
                    boxShadow: 0,
                    transitionDuration: '0.2s',
                    borderRadius: '12px',
                    alignItems: 'center'
                  }}
                >
                  <Skeleton variant='circular' width={40} height={40} />
                  <Typography variant='body2' sx={{ color: '#000', fontWeight: '500', ml: 4 }}>
                    <Skeleton />
                  </Typography>
                </Box>
              )
            })}
      </>
    )
  }

  return (
    <>
      {!hidden ? (
        <Modal
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
          open={open}
          onClose={onClose}
        >
          <Card sx={{ minWidth: '300px', width: '50%', height: '80%' }}>
            <Box style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <TextField
                size={'small'}
                placeholder={'Search Masma'}
                sx={{ paddingTop: 4, paddingX: 4, width: '80%' }}
                fullWidth
                autoFocus={true}
                variant='standard'
                InputProps={{ startAdornment: <Magnify sx={{ marginRight: 2 }} />, disableUnderline: true }}
                onChange={e => setSearch(e.target.value)}
              />
              <Box onClick={onClose} style={{ marginTop: 8, marginRight: 12 }}>
                [Esc]
              </Box>
            </Box>
            <hr />
            <Box sx={{ display: 'grid', padding: 1, gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {routes.map((name, index) => {
                return (
                  <Box key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', paddingX: 2 }}>
                      <TrendingDown />
                      <Typography variant='body2' sx={{ fontSize: 14, ml: 2 }}>
                        {name}
                      </Typography>
                    </Box>
                    {name == 'Accounts' && users !== undefined
                      ? users.filter(({ username }) => username.toLowerCase().includes(currentSearch.toLowerCase()))
                        ? users
                            .filter(user => user.username.toLowerCase().includes(currentSearch.toLowerCase()))
                            .map((user, index) => {
                              return (
                                <Box
                                  key={index}
                                  sx={{
                                    display: 'flex',
                                    mx: 4,
                                    p: 1,
                                    boxShadow: 0,
                                    transitionDuration: '0.2s',
                                    borderRadius: '12px',
                                    alignItems: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                      backgroundColor: '#E0E0E0'
                                    }
                                  }}
                                  onClick={() => {
                                    router.push(`/profile/${user?.profileId}`)
                                    onClose()
                                  }}
                                >
                                  <CardMedia sx={{ height: 40, width: 40, borderRadius: 1 }} image={user.avatar} />
                                  <Typography variant='body2' sx={{ color: '#000', fontWeight: '500', ml: 4 }}>
                                    {user.username}
                                  </Typography>
                                </Box>
                              )
                            })
                        : null
                      : [...Array(20)].map((e, _id) => {
                          return (
                            <Box
                              key={_id}
                              sx={{
                                display: 'flex',
                                mx: 4,
                                p: 1,
                                boxShadow: 0,
                                transitionDuration: '0.2s',
                                borderRadius: '12px',
                                alignItems: 'center'
                              }}
                            >
                              <Skeleton variant='rectangular' width={40} height={40} />
                              <Typography sx={{ color: '#000', fontWeight: '500', ml: 4, width: '100%' }}>
                                <Skeleton />
                              </Typography>
                            </Box>
                          )
                        })}

                    {name == 'Pages'
                      ? navArray
                          .filter(item => item?.title.toLowerCase().includes(currentSearch.toLowerCase()))
                          .map((item, index) => {
                            if (item.badgeContent == 'Soon') return null

                            return (
                              <Box
                                onClick={() => {
                                  onClose()
                                  // eslint-disable-next-line @typescript-eslint/no-misused-promises
                                  router.replace(item.path)
                                }}
                                key={index}
                                sx={{
                                  display: 'flex',
                                  mx: 4,
                                  p: 1,
                                  boxShadow: 0,
                                  transitionDuration: '0.2s',
                                  borderRadius: '12px',
                                  alignItems: 'center',
                                  '&:hover': {
                                    backgroundColor: '#E0E0E0'
                                  }
                                }}
                              >
                                {item.title}
                              </Box>
                            )
                          })
                      : null}
                  </Box>
                )
              })}
            </Box>
          </Card>
        </Modal>
      ) : (
        <Modal
          open={open}
          onClose={onClose}
          sx={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Slide direction='down' in={true}>
            <Box sx={{ width: '80%' }}>
              <Card sx={{ width: '100%', my: 4, display: 'flex', justifyContent: 'center' }}>
                <TextField
                  size={'small'}
                  placeholder={'Search Masma'}
                  sx={{ paddingTop: 0, paddingX: 2, my: 2, width: '100%' }}
                  value={currentSearch}
                  fullWidth
                  autoFocus={true}
                  variant='standard'
                  InputProps={{ startAdornment: <Magnify />, disableUnderline: true }}
                  onChange={e => setSearch(e.target.value)}
                />
              </Card>

              <Card
                sx={{
                  width: '100%',
                  height: '50%',
                  borderRadius: '2%',
                  paddingY: 3,
                  scrollBehaviour: 'smooth',
                  overflowY: 'scroll'
                }}
              >
                {routes.map((route, index) => {
                  return <MobileHeader key={index} name={route} />
                })}
              </Card>
            </Box>
          </Slide>
        </Modal>
      )}
    </>
  )
}
