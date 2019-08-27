import express from 'express';
import next from 'next';
import cookieParser from 'cookie-parser';

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare()
  .then(() => {
    const server = express();

    server.use(cookieParser());

    server.get('/signin', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signin', req.query);
      }
    });

    server.get('/signup', (req, res) => {
      if(req.cookies.token) {
        res.redirect('/');
      } else {
        return app.render(req, res, '/signup', req.query);
      }
    });

    server.get('*', (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch((ex) => {
    console.error(ex.stack);
    process.exit(1);
  });
