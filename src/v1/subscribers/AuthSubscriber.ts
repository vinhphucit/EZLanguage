import {EventSubscriber, On} from 'event-dispatch';
import Container from 'typedi';
import { Logger } from '../../base/utils/Logger';
import { IUserChore } from '../models/dao/UserChore';
import { Mailer } from '../utils/Mailer';
import events from './Events';

@EventSubscriber()
export default class PmsPropertySubscriber {
    @On(events.auth.register)
    public async onUserRegistered(userChore: Partial<IUserChore>) {        
        const mailer = Container.get(Mailer);
        await mailer.sendRegistrationMail(userChore.email, userChore.emailVerificationCode, new Date(userChore.emailVerificationExpiredAt*1000));
    }

    @On(events.auth.resetPassword)
    public async onUserResetPassword(userChore: Partial<IUserChore>) {        
        const mailer = Container.get(Mailer);
        await mailer.sendResetPasswordMail(userChore.email, userChore.resetPasswordCode, new Date(userChore.resetPasswordExpiredAt*1000));
    }
}
