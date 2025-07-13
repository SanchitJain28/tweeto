Project Goal : This is Social app like twitter , like it inspired from twitter , design and working is different
key technologies : Nextjs App router as frontend , Supabase for backend , Using React query or tanstack query for data fetching ,using realtime supabase for incoming Requests ? notifications , This app is using Typescript so make sure types are there
Key functionalities : Users can like post ,comment on tweets make thier each profile ,follow peeople and can save posts , and can post tweet by using AI
Coding Conventions : All components should be functional components with TypeScript

For Forms : Use React-hook-form and zod for validation
For animations : use motion animation library from 'motion/react'\
For UI components : use Shadcn and components in @src/components/ui
For API Calls : use axios
For Calling Supabase :

1. From server : const supabase = await createClient() , where createClient() from @/app/utils/supabase/server
   2.From client : const supabase = createClient(), where createClient() from @/app/utils/supabase/client

All the Database schema is in - `database-schema.sql`
