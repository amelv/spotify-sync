'use client'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import {
  Box,
  Button,
  Collapse,
  Container,
  debounce,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { ChangeEvent, FormEvent, useCallback, useMemo, useState } from 'react'
import { SortOption } from '@/hooks/useSelectorState'
import { useStore } from '@/store'

interface Props {
  handleSelectAll: () => void
}

/**
 * The form to filter the albums by name and sort them.
 * @prop handleSelectAll - The function to select all albums.
 */
export const FilterAlbumsForm = ({ handleSelectAll }: Props) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  const searchQuery = useStore(store => store.searchQuery)
  const sortOption = useStore(store => store.sortOption)
  const dispatch = useStore(store => store.dispatchAlbumSelectionAction)

  const [searchInputValue, setSearchInputValue] = useState(searchQuery)
  const [hideFormInputs, setHideFormInputs] = useState(isMobile)

  const debouncedQueryDisptach = useMemo(
    () =>
      debounce((event: ChangeEvent<HTMLInputElement>) => {
        event.preventDefault()
        if (searchQuery !== event.target.value) {
          dispatch({
            type: 'update-search',
            payload: event.target.value
          })
          if (window.scrollY > 0) {
            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                setTimeout(() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }, 20)
              })
            })
          }
        }
      }, 150),
    [searchQuery, dispatch]
  )

  const onInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setSearchInputValue(event.target.value)
      debouncedQueryDisptach(event)
    },
    [debouncedQueryDisptach]
  )
  return (
    <Container
      component='form'
      sx={theme => ({
        position: 'sticky',
        top: -2,
        width: '100%',
        maxHeight: ['100%', '120px'],
        padding: ['1rem', '0.5rem'],
        zIndex: 3,
        display: 'flex',
        backgroundColor: theme.palette.background.paper,
        flexDirection: ['column', 'row'],
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px',
        border: '2px solid #282828',
        boxShadow:
          '0px 7px 7px -4px rgba(0,0,0,0.2),0px 10px 13px 2px rgba(0,0,0,0.14),0px 4px 17px 3px rgba(0,0,0,0.12)',
        borderRadius: '4px'
      })}
      onSubmit={(e: FormEvent) => e.preventDefault()}
    >
      <FormControl
        sx={theme => ({
          m: 1,
          width: '25ch',

          '& label.Mui-focused': {
            color: theme.palette.primary.main
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: theme.palette.primary.main
          },
          '& .MuiInputBase-root': {
            borderColor: theme.palette.info.main
          },
          '& .MuiInputBase-adornedEnd': {
            borderColor: theme.palette.info.main
          },
          '& .MuiOutlinedInput-root': {
            '&:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.info.main
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main
            },
            '& .Mui-focused .MuiOutlinedInput-notchedOutline .MuiSvgIcon-root':
              {
                color: theme.palette.primary.main,
                borderColor: theme.palette.primary.main
              }
          }
        })}
        variant='outlined'
      >
        <InputLabel htmlFor='search-input'>Search</InputLabel>
        <OutlinedInput
          label='Search'
          id='search-input'
          value={searchInputValue}
          onChange={onInputChange}
        />
      </FormControl>
      {isMobile ? (
        <Collapse in={isMobile ? !hideFormInputs : true}>
          <Select
            value={sortOption}
            onChange={event =>
              dispatch({
                type: 'update-sort',
                payload: event.target.value as SortOption
              })
            }
          >
            {Object.values(SortOption).map(optionValue => (
              <MenuItem key={optionValue} value={optionValue}>
                {optionValue}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: ['100%', '25%'],
              justifyContent: ['space-between', 'space-evenly'],
              gap: '.25rem'
            }}
          >
            <Button
              variant='outlined'
              color='secondary'
              onClick={() => dispatch({ type: 'clear', payload: null })}
            >
              Clear
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </Box>
        </Collapse>
      ) : (
        <>
          <Select
            sx={theme => ({
              borderColor: theme.palette.info.main,
              '& label.Mui-focused': {
                color: theme.palette.primary.main
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: theme.palette.primary.main
              },
              '& .MuiInputBase-root': {
                borderColor: theme.palette.info.main
              },
              '& .MuiInputBase-adornedEnd': {
                borderColor: theme.palette.info.main
              },
              '&:not(.Mui-focused)  .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.info.main
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: theme.palette.primary.main
              },
              '& .Mui-focused .MuiOutlinedInput-notchedOutline .MuiSvgIcon-root':
                {
                  color: theme.palette.primary.main,
                  borderColor: theme.palette.primary.main
                },
              '& .MuiSvgIcon-root': {
                fill: theme.palette.info.main
              },
              '& .MuiSelect-iconOpen': {
                fill: theme.palette.primary.main
              }
            })}
            value={sortOption}
            displayEmpty
            renderValue={(selected: string) => {
              if (selected.length === 0) {
                return (
                  <span style={{ color: 'darkgray' }}>Select sort option</span>
                )
              }

              return selected
            }}
            onChange={event =>
              dispatch({
                type: 'update-sort',
                payload: event.target.value as SortOption
              })
            }
          >
            {Object.values(SortOption).map(optionValue => (
              <MenuItem key={optionValue} value={optionValue}>
                {optionValue}
              </MenuItem>
            ))}
          </Select>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              width: ['100%', '25%'],
              justifyContent: ['space-between', 'space-evenly'],
              gap: '.25rem'
            }}
          >
            <Button
              variant='outlined'
              color='info'
              onClick={() => dispatch({ type: 'clear', payload: null })}
            >
              Clear
            </Button>
            <Button
              variant='outlined'
              color='primary'
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </Box>
        </>
      )}

      {isMobile && (
        <IconButton
          type='button'
          onClick={() => setHideFormInputs(val => !val)}
        >
          {hideFormInputs ? <ExpandMoreIcon /> : <ExpandLessIcon />}
        </IconButton>
      )}
    </Container>
  )
}
