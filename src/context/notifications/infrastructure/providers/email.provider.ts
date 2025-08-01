import * as nodemailer from 'nodemailer';
import hbs from 'nodemailer-express-handlebars';
import { join } from 'path';
import { Inject, Injectable } from '@nestjs/common';
import { AppConfigProvider } from 'src/shared/config/config.provider';
import { ISendEmail } from '../../domain';

@Injectable()
export class MailProvider {
  private transporter: nodemailer.Transporter;

  constructor(
    @Inject('AppConfigProvider')
    private readonly config: AppConfigProvider,
  ) {
    this.transporter = nodemailer.createTransport(config.emailConfigTransport);

    const handlebarOptions: hbs.NodemailerExpressHandlebarsOptions = {
      viewEngine: {
        partialsDir: join(__dirname, 'templates'),
        defaultLayout: false,
      },
      viewPath: join(__dirname, 'templates'),
      extName: '.hbs',
    };

    this.transporter.use('compile', hbs(handlebarOptions));
  }

  sendEmail(data: ISendEmail) {
    return this.transporter.sendMail(data);
  }
}
