import {
  Card,
  CardContent,
  Typography,
  Chip,
  CardMedia,
  Grid,
  Stack,
  useMediaQuery,
  useTheme,
  Box,
  CircularProgress,
} from '@mui/material'
import Rating from '@mui/lab/Rating'
import { CommentsLevel, Item } from '../types'
import { placeholderImageUrl } from '../constants'
import CustomTreeView from './TreeView'
import { useEffect, useState } from 'react'
import { getCommentTree } from '../services/hackerNewsHighLevelRequests'
import CommentForm from './CommentForm'
import { getItemById } from '../services/hackerNewsLowLevelRequests'

type PostProps = {
  post: Item
}

const Post = ({ post }: PostProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const [comments, setComments] = useState<CommentsLevel>()
  const [isCommentsLoading, setIsCommentsLoading] = useState<boolean>(false)

  // useless event providing is required by react pattern callback syntax
  const expandComments = async (
    _event?: React.MouseEvent<HTMLDivElement>,
    explicityKids?: Array<number>,
  ) => {
    setIsCommentsLoading(true)
    setComments(
      (await getCommentTree(
        explicityKids ?? (post.kids as Array<number>),
      )) as CommentsLevel,
    )
  }

  const refetchComments = async () => {
    const refetchedPost = await getItemById(post.id)
    expandComments(undefined, refetchedPost.kids as Array<number>)
  }

  useEffect(() => {
    if (comments) {
      setIsCommentsLoading(false)
    }
  }, [comments])

  return (
    <Stack direction={'column'}>
      <Grid item xs={12} sm={6} md={4} marginY={'20px'}>
        <Card elevation={2}>
          <Grid container>
            <Grid item xs={12} md={6}>
              <CardMedia
                component="img"
                image={post.imageUrl || placeholderImageUrl}
                alt={post.title}
              />
            </Grid>
            <Grid container item xs={12} md={6}>
              <CardContent sx={{ width: '100%' }}>
                <Box
                  display="flex"
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  height={'100%'}
                >
                  <Stack spacing={2} direction="column">
                    <Typography
                      align={isMobile ? 'center' : 'left'}
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      {post.title}
                    </Typography>
                    <Typography
                      align={isMobile ? 'center' : 'left'}
                      variant="subtitle1"
                      color="text.secondary"
                    >
                      By: {post.by}
                    </Typography>
                    <Typography
                      align={isMobile ? 'center' : 'left'}
                      variant="body2"
                      paddingRight={'10px'}
                    >
                      {post.text ?? <a href={post.url}>Original page</a>}
                    </Typography>
                    <Typography
                      align={isMobile ? 'center' : 'left'}
                      variant="subtitle2"
                      color="text.secondary"
                    >
                      {new Date(post.time * 1000).toDateString()}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    marginTop={'20px'}
                  >
                    <Stack
                      spacing={2}
                      direction="row"
                      justifyContent={isMobile ? 'center' : 'flex-start'}
                    >
                      <Chip label={`Type: ${post.type}`} variant="outlined" />
                      <Chip
                        label={`Comments: ${post.descendants}`}
                        variant="outlined"
                        onClick={expandComments}
                      />
                      {comments && (
                        <Chip
                          label={`Refetch comments`}
                          variant="outlined"
                          onClick={refetchComments}
                        />
                      )}
                      {isCommentsLoading && <CircularProgress size={30} />}
                    </Stack>
                    <Rating
                      name="read-only"
                      value={post.score / 20}
                      readOnly
                      max={5}
                    />
                  </Stack>
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      {!!comments && (
        <Grid item xs={12} sm={6} md={4} marginY={'20px'}>
          <Typography
            align={isMobile ? 'center' : 'left'}
            gutterBottom
            variant="h2"
            component="div"
            data-testid="comments-section"
          >
            Comments
          </Typography>
          <CustomTreeView
            id={post.id.toString()}
            title={post.title}
            kids={comments}
          />
          <CommentForm />
        </Grid>
      )}
    </Stack>
  )
}

export default Post