import { Request, Response } from 'express';

export default (app: any) => {

    app.route('/')
        .get((_: Request, res: Response) => {
            res.send("This example is working fine.")
        });

}