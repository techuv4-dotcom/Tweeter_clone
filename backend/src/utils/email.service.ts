import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class EmailService {
  async sendOtp(email: string, otp: string) {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: {
          name: 'Twitter Clone',
          email: 'techuv4@gmail.com',
        },
        to: [{ email }],
        subject: 'OTP Verification',
        htmlContent: `
          <h2>Your OTP is ${otp}</h2>
          <p>This OTP is valid for 5 minutes.</p>
        `,
      },
      {
        headers: {
          'api-key': process.env.RESEND_API_KEY,
          'Content-Type': 'application/json',
        },
      },
    );

    return response.data;
  }
}
