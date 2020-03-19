import * as express from 'express';
import { Router, Request, Response } from 'express';
import { Jwt } from '../models/jwt';
var osmosis = require('osmosis');
import * as HttpStatus from 'http-status-codes';

const jwt = new Jwt();

const router: Router = Router();


router.get('/', (req: Request, res: Response) => {
  try {
    let list = [];
    osmosis
      .get('https://pr.moph.go.th/?url=pr/index/2/04/')
      .find('div.comment-widgets > div.comment-row')
      .set({
        'img': 'img@src',
        'link': 'h4 > b > a@href',
        'title': 'h4 > b > a',
        'date': 'div.comment-footer > span[1]',
        'by': 'div.comment-footer > span[2]',
        'view': 'div.comment-footer > span[3]'
      })
      .data(function (data) {
        list.push(data);
      })
      .done(function () {
        for (const l of list) {
          l.img = `https://pr.moph.go.th/${l.img}`;
          l.link = `https://pr.moph.go.th${l.link}`;
        }
        res.send({ ok: true, rows: list });

      })
    // res.send('<h1>Hello Fucking World</h1>');
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});


export default router;