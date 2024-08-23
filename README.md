### Features implemented

- [x] User Registration using email, name and password and Authentication using email and password
- [x] Access protected dashboard and pages
- [x] Display of all available auction items (except the ones user posted themselves)
- [x] Display of user listed auction items
- [x] Good commit messages following commit conventions
- [x] API endpoint at [/api/products]('/api/products')
- [x] password is hashed using bcrypt

User stories:

- [x] user can post their own auction items
- [x] users can edit their auction item descriptions and ending date
- [x] users can delete their auction items

### Deployment

@ [https://abb-project.vercel.app/](https://abb-project.vercel.app/)

### Schema

![DB Schema](public/schema.png)
Supabase creates an automatic users table under auth schema

### Setup on your system

Dependency: pnpm

```sh
npm install -g pnpm
```

```sh
git clone https://github.com/AkshajP/abb-project.git
cd abb-project/
pnpm i
pnpm dev
```
