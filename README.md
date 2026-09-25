# SutraMail

A Gmail-style mail client. Compose, send, star, trash, restore and search, with mail exchanged between accounts on the same app.

Live: [sutramail.vercel.app](https://sutramail.vercel.app)

<img width="100%" alt="SutraMail inbox with the folder sidebar, mail list and compose button" src="https://github.com/user-attachments/assets/3f9ac28c-f199-4047-9e8c-f59160ca4f12" />

## Why I built it

Mail clients look simple and are not. Every message exists in two mailboxes at once, a delete on one side must not touch the other, trash has to be reversible, and the inbox has to keep up with new mail without the user refreshing. I built this to work through those state problems on a real interface rather than a todo list.

## What it does

**Mailboxes.** Inbox, sent, starred, trash. Each mail is written to the sender's sent box and the receiver's inbox as separate records, so one side can star or trash it without affecting the other.

**Compose.** A rich text editor for the body, sent to any other account registered on the app.

**Trash that comes back.** Deleting moves a mail to trash. From there it can be restored or removed for good.

**Search.** Filters the current mailbox by sender, subject and body.

**Account.** Update display name, profile picture and password.

**Live inbox.** The mailbox polls every two seconds, so new mail shows up without a refresh.

## What is not there

Drafts, snooze, archive and scheduled send have routes and pages but are not functional yet. The settings page is static. Mail only travels between SutraMail accounts, there is no SMTP or external delivery.

## Stack

React 19, Vite, Redux Toolkit, React Router, Tailwind CSS 4, Draft.js for the editor, date-fns. Firebase Authentication and Realtime Database, both through their REST APIs. Deployed on Vercel.

## Running it

```bash
npm install
cp .env.example .env    # Firebase web API key and Realtime Database URL
npm run dev
```

## Screenshots

**Login and sign up**
<img width="100%" alt="Login page" src="https://github.com/user-attachments/assets/71e0e60b-0027-4c63-8368-2d81e49f5a0f" />

**Compose**
<img width="100%" alt="Compose dialog with recipient, subject and rich text body" src="https://github.com/user-attachments/assets/4ccb4bb3-8b87-4971-bc35-be4b1e38bc5b" />

**Reading a mail**
<img width="100%" alt="Open mail view" src="https://github.com/user-attachments/assets/399e673e-505e-42e0-92fc-2392524da536" />

**Starred, sent and trash**
<img width="100%" alt="Starred mailbox" src="https://github.com/user-attachments/assets/a896c536-4a5a-493d-b2c8-f28b518a65f7" />
<img width="100%" alt="Sent mailbox" src="https://github.com/user-attachments/assets/83615298-337a-4d4f-b3e9-5876b32b62c9" />
<img width="100%" alt="Trash with restore and delete forever" src="https://github.com/user-attachments/assets/fcdd6e86-c68d-43d2-9920-0996ab5653be" />
