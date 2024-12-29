module.exports = {
    name: 'terms',
    description: "NouRax's Terms of Service",
    $if: 'old',
    code: `
$isInteraction
$addField[➜  Questions;If you have any questions about these Terms of Service, please contact us at  **tyowk@outlook.com**. We are here to help and will respond to your inquiries as soon as possible.]
$addField[➜  Governing Law;NouRax is hosted in Indonesia, and these Terms of Service shall be governed by and construed in accordance with the laws of Indonesia, without regard to its conflict of law principles.]
$addField[➜  Changes to Terms;We may update these Terms of Service from time to time. We will notify users of any changes by posting the new terms on our website, discord server or through the bot. Your continued use of the bot after any changes constitutes your acceptance of the new terms.]
$addField[➜  Limitation of Liabilities;To the fullest extent permitted by law, NouJS Development shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of NouRax.]
$addField[➜  Disclaimer of Warranties;NouRax is provided on an "as-is" and "as-available" basis. We do not warrant that the bot will be uninterrupted, secure, or error-free. Your use of the bot is at your own risk.]
$addField[➜  Termination;We reserve the right to suspend or terminate your access to NouRax at any time, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users or the bot.]
$addField[➜  User Conduct;**You agree not to:**
- Use the bot in a manner that disrupts or interferes with Discord or other users.
- Harass, threaten, or abuse other users.
- Use the bot to promote spam, malware, or any other harmful content.]
$addField[➜  Copyright and Intellectual Property;- NouRax does not host any music files. The bot streams music from third-party sources, and you are responsible for ensuring that your use of the bot complies with the terms of those sources.
- All intellectual property rights in the bot and its features are owned by NouJS Development. You may not copy, modify, or distribute any part of the bot without our express written permission.]
$addField[➜  User Responsibilities;- You must be at least 13 years old to use NouRax.
- You are responsible for any content you play through the bot and must ensure that you have the necessary rights to use that content.
- You agree not to use the bot for any illegal or unauthorized purposes, including but not limited to copyright infringement.]
$addField[➜  About the Service;NouRax provides music playback services within Discord servers, allowing users to play, pause, skip, and manage music tracks from various sources. The bot may also offer additional features such as filters, volume control, and more.]
$description[By inviting, using and interact with NouRax on your Discord server, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.]
$title[NOURAX'S TERMS OF SERVICE]
$color[#4367FE]
$footer[© NouJS Development | Last Updated Dec 15, 2024]
$checkPerms
`,
};
