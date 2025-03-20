import {
    Table, TableBody, TableCell, TableHead, TableRow, TablePagination
  } from '@mui/material';
  
  export default function DataTable({ posts, page, onPageChange, search }) {
    const postsPerPage = 5;
    const paginatedPosts = posts.slice(page * postsPerPage, (page + 1) * postsPerPage);
  
    return (
      <>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Body</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPosts.map((post) => (
              <TableRow key={post.id}>
                <TableCell>{post.id}</TableCell>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.body}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <TablePagination
          component="div"
          count={posts.length}
          page={page}
          onPageChange={onPageChange}
          rowsPerPage={postsPerPage}
          rowsPerPageOptions={[5]}
        />
      </>
    );
  }