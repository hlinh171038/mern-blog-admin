# mern-blog-admin
// descript: blog page to admin  manegerment the blog, post new blog, update blog
//function:
1.login,log out, registry (token, authentication token)
2.post new blog 
3.update page (img,title,content)

// techical:
1.(MERN)
2.bootstrap
//framework and library
- express:
- mongoose:
- cors:(middleware)-->connect from localhost:3000 to localhost:5000 throught link(app)
- bcrypt: hash password( best way to store password in saft way)
- jsonwebtoken: (JWT) is the middleware request to transport between client and server , the information into JWT's string is idetify by JSON, have 3 part header,payload and signature
- react-quill: support format form to (bold,italic,order list, size) of test
- multer:save file link to upload folder
- date-fns : set time 
3.token authentication
// server:mongodb
// dataname:blogadmin 
// password:vofghfTVKuffhdW0