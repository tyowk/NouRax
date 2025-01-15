module.exports = {
    name: 'privacy',
    description: "NouRax's Privacy Policy",
    $if: 'old',
    code: `
$isInteraction
$addField[$getEmoji[bdot]  Contact Us;If you have any questions or concerns about this Privacy Policy, please contact us at **tyowk@outlook.com**. We are here to help and will respond to your inquiries as soon as possible.]
$addField[$getEmoji[bdot]  Changes to This Privacy Policy;We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our website, Discord server, or through the bot. Your continued use of the bot after any changes constitutes your acceptance of the new Privacy Policy.]
$addField[$getEmoji[bdot]  Third-Party Services;NouRax may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to review the privacy policies of any third-party services you use, as their practices may differ from ours.]
$addField[$getEmoji[bdot]  User Rights;**You have the right to:**
* Request a copy of your personal information we hold.
* Request correction of any inaccurate or incomplete information.
* Request deletion of your personal information, subject to certain exceptions.
* Object to or restrict the processing of your personal information.
* Wthdraw consent at any time where we rely on your consent to process your personal information.]
$addField[$getEmoji[bdot]  Data Security;We take the security of your personal information seriously. We implement reasonable security measures to protect your information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or method of electronic storage is 100% secure, and we cannot guarantee its absolute security.]
$addField[$getEmoji[bdot]  How We Use Your Information;**We use the information we collect to:**
* Deliver and maintain the NouRax service.
* Enhance, personalize, and expand our offerings based on user feedback and usage patterns.
* Send updates, notifications, and respond to inquiries.
* Monitor usage and analyze trends to improve user experience and service quality.]
$addField[$getEmoji[bdot]  Information We Collect;**We may collect the following types of information when you use NouRax:**
* User ID, User Avatar, username, Guild ID, and Guild Name for identification purposes.
* Commands used, music played, and other interactions to improve our services.]
$description[By inviting, using, and interacting with NouRax on your Discord server, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.]
$title[NOURAX'S PRIVACY POLICY]
$color[#4367FE]
$footer[© NouJS Development | Last Updated Dec 15, 2024]
$checkPerms
`,
};
