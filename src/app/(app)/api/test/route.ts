// app/api/create-users/route.ts
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://smzsixohgqefxjebpuoh.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtenNpeG9oZ3FlZnhqZWJwdW9oIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc0NjUxMDMzNCwiZXhwIjoyMDYyMDg2MzM0fQ.dVRp8i3pQDY-q8Fh8cl-TAkLbwUl5xlJS6UhD2KpMio"
);

export async function POST() {
  // const Users = [
  //   {
  //     email: "arjunkumar@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "preetkaur@gmail.com",
  //     password: "sunshine456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "viveksharma@gmail.com",
  //     password: "ilovemyindia789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neelamrai@gmail.com",
  //     password: "passw0rd",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepakkumar@gmail.com",
  //     password: "mypassword123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karanjain@gmail.com",
  //     password: "securepass456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojpatel@gmail.com",
  //     password: "india#2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "saraswatinair@gmail.com",
  //     password: "indiafan789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshitaap@gmail.com",
  //     password: "harsh@123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rohitverma@gmail.com",
  //     password: "verma1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anjalikumar@gmail.com",
  //     password: "kitchen987",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikassharma@gmail.com",
  //     password: "vks2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyapatel@gmail.com",
  //     password: "password456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "tarunkumar@gmail.com",
  //     password: "mypassword789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehaagarwal@gmail.com",
  //     password: "neha2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "suniltripathi@gmail.com",
  //     password: "tripathi#1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "dineshsingh@gmail.com",
  //     password: "dinesh@123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "meghnarani@gmail.com",
  //     password: "meghna2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "amitkumar@gmail.com",
  //     password: "am1tkm",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rakshitpatel@gmail.com",
  //     password: "p@ssword789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arunsingh@gmail.com",
  //     password: "sunshine123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehamalhotra@gmail.com",
  //     password: "pavilion456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikashkumar@gmail.com",
  //     password: "mountain789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepaksharma@gmail.com",
  //     password: "riverflow101",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyasingh@gmail.com",
  //     password: "starlight202",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "raviaks@gmail.com",
  //     password: "oceanbreeze303",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "siddharthgupta@gmail.com",
  //     password: "meadow456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kiranpatel@gmail.com",
  //     password: "orchid789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anushram@gmail.com",
  //     password: "dawnstar101",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojyadav@gmail.com",
  //     password: "falcon202",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "swapnasingh@gmail.com",
  //     password: "rainbow303",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshitdesai@gmail.com",
  //     password: "desertwind404",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajsharma@gmail.com",
  //     password: "phoenix505",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshmalik@gmail.com",
  //     password: "lakeside606",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ritikjain@gmail.com",
  //     password: "sunset707",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vinaykrishna@gmail.com",
  //     password: "twilight808",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "satyaprasad@gmail.com",
  //     password: "volcano909",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "prakashrai@gmail.com",
  //     password: "zenith010",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anujpatel@gmail.com",
  //     password: "starlit111",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kamalnath@gmail.com",
  //     password: "dusk213",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rajeshkumar@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyasingh@gmail.com",
  //     password: "passw0rd!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "amitpatel@gmail.com",
  //     password: "qwertyuiop",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sangitamohan@gmail.com",
  //     password: "ilovepassword",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sunilsharma@gmail.com",
  //     password: "mypassword1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunrao@gmail.com",
  //     password: "securePass2",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepaksharma@gmail.com",
  //     password: "admin1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehaagarwal@gmail.com",
  //     password: "pass1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikaspatel@gmail.com",
  //     password: "welcome1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anjanibhat@gmail.com",
  //     password: "letmein!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "krishnabhagat@gmail.com",
  //     password: "india2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajkumar@gmail.com",
  //     password: "helloWorld",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilkumar@gmail.com",
  //     password: "passw0rd!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divyapandey@gmail.com",
  //     password: "trustno1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rakeshrawat@gmail.com",
  //     password: "password!2",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyankasinha@gmail.com",
  //     password: "mypassword!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojgupta@gmail.com",
  //     password: "password2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshithreddy@gmail.com",
  //     password: "qazxswedc",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sonitandon@gmail.com",
  //     password: "secure123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshkumari@gmail.com",
  //     password: "admin2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunkumar@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyagupta@gmail.com",
  //     password: "passw0rd!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "viveksharma@gmail.com",
  //     password: "welcome2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehaagarwal@gmail.com",
  //     password: "mypassword",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshpatel@gmail.com",
  //     password: "securepass1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kiranverma@gmail.com",
  //     password: "letmein!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumitjain@gmail.com",
  //     password: "admin1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anjaliapril@gmail.com",
  //     password: "iloveyou!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepakrai@gmail.com",
  //     password: "qwertyuiop",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "satishkumar@gmail.com",
  //     password: "trustno1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ritusharma@gmail.com",
  //     password: "pass1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vijaysingh@gmail.com",
  //     password: "password1!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "tanishvarma@gmail.com",
  //     password: "helloWorld",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manishkumar@gmail.com",
  //     password: "abc12345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "swatikumar@gmail.com",
  //     password: "mypassword1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "lakshmitandon@gmail.com",
  //     password: "qazxswedc",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ajaypatel@gmail.com",
  //     password: "testpassword",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "poojaverma@gmail.com",
  //     password: "sunshine2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "himanshuk@gmail.com",
  //     password: "dragonfly!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rituparmar@gmail.com",
  //     password: "iloveyou2",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arunsingh@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyapatel@gmail.com",
  //     password: "passw0rd",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karanverma@gmail.com",
  //     password: "k@ran2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehamishra@gmail.com",
  //     password: "neha#123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rohitgupta@gmail.com",
  //     password: "rohit2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "saanvikaanand@gmail.com",
  //     password: "saan12345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "abhinavsharma@gmail.com",
  //     password: "sharma#789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divyanagpal@gmail.com",
  //     password: "divya!987",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilrajput@gmail.com",
  //     password: "rajput88",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumanbajpai@gmail.com",
  //     password: "bajpai2021",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikaskumar@gmail.com",
  //     password: "viku@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "puneetshah@gmail.com",
  //     password: "puneet!456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "meghnachoudhury@gmail.com",
  //     password: "meghna2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karanmalhotra@gmail.com",
  //     password: "malhotra#9",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ishanpatel@gmail.com",
  //     password: "ishan@123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rakshithnandan@gmail.com",
  //     password: "nandan456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sunitapandey@gmail.com",
  //     password: "suni@2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anupamasinha@gmail.com",
  //     password: "sinha@789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vidhishah@gmail.com",
  //     password: "vidhi#123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyanshgupta@gmail.com",
  //     password: "priyansh!01",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshkulkarni@gmail.com",
  //     password: "pass1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arunpatel@gmail.com",
  //     password: "qwerty789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajverma@gmail.com",
  //     password: "mypassword1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilsharma@gmail.com",
  //     password: "abc12345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rameshjain@gmail.com",
  //     password: "welcome2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikashsingh@gmail.com",
  //     password: "iloveindia9",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kiranpandey@gmail.com",
  //     password: "sunshine1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "prashantgupta@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepakrawat@gmail.com",
  //     password: "securepwd!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "santoshrawat@gmail.com",
  //     password: "india2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "gauravjoshi@gmail.com",
  //     password: "mysecurepass",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manishkumar@gmail.com",
  //     password: "letmein2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vivekshah@gmail.com",
  //     password: "trustno1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "dhirendrajoshi@gmail.com",
  //     password: "ilikeit",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "abhishekkumar@gmail.com",
  //     password: "happy1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neerajmehta@gmail.com",
  //     password: "bestpassword",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumitagarwal@gmail.com",
  //     password: "xyz98765",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "adityapandey@gmail.com",
  //     password: "password!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kaushikdhawan@gmail.com",
  //     password: "mysecretpass",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ramkumarpatil@gmail.com",
  //     password: "happylife",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arunpatel@gmail.com",
  //     password: "Passw0rd123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "shivkumar@gmail.com",
  //     password: "SecurePwd!56",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neharaj@gmail.com",
  //     password: "India@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyasharma@gmail.com",
  //     password: "MyPass2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "viveknair@gmail.com",
  //     password: "Nair2023!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepaksingh@gmail.com",
  //     password: "SinghPass!89",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kiranmishra@gmail.com",
  //     password: "Kiran@456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anjalijoshi@gmail.com",
  //     password: "Anjali@789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojgupta@gmail.com",
  //     password: "Gupta#2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sunitadav@gmail.com",
  //     password: "Sunit@2021",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ritupawar@gmail.com",
  //     password: "Ritu@pass",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anjalimishra@gmail.com",
  //     password: "Mishra#01",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilkumargupta@gmail.com",
  //     password: "Anil@2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "laxmipatel@gmail.com",
  //     password: "Laxmi@123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "smritamishra@gmail.com",
  //     password: "Smriti!456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshkumar@gmail.com",
  //     password: "Harsh@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pravintandon@gmail.com",
  //     password: "Pravin@567",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "yashsinha@gmail.com",
  //     password: "Yash!890",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumanparmar@gmail.com",
  //     password: "Suman@2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nitinsharma@gmail.com",
  //     password: "Nitin@2025",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ajaykumar@gmail.com",
  //     password: "pass12word",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sunilchoudhury@gmail.com",
  //     password: "mypassword!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rakshithpatel@gmail.com",
  //     password: "secure123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyapathi@gmail.com",
  //     password: "helloWorld1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vishalravi@gmail.com",
  //     password: "password2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepikapandey@gmail.com",
  //     password: "qwertyuiop",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilthakur@gmail.com",
  //     password: "iloveindian123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neerajsingh@gmail.com",
  //     password: "admin2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojkumar@gmail.com",
  //     password: "xyz12345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karansingh@gmail.com",
  //     password: "password!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "gauravmehta@gmail.com",
  //     password: "letmein!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "mohitverma@gmail.com",
  //     password: "ilovecoding",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "shivampatel@gmail.com",
  //     password: "passWord2",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pradeepnair@gmail.com",
  //     password: "mypassword",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sanjayparmar@gmail.com",
  //     password: "qazwsx123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshpatel@gmail.com",
  //     password: "sunshine9",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshchandra@gmail.com",
  //     password: "password2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajseth@gmail.com",
  //     password: "india1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vinitkhanna@gmail.com",
  //     password: "securepass",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunravi@gmail.com",
  //     password: "welcome1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilkumar@gmail.com",
  //     password: "Sunshine123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "puneetverma@gmail.com",
  //     password: "Moonlight456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sharmaramesh@gmail.com",
  //     password: "StarryNight789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepaknandan@gmail.com",
  //     password: "MorningSun101",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rajivsharma@gmail.com",
  //     password: "EveningStar234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "krishnamurthy@gmail.com",
  //     password: "DawnBringer345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sunilpatel@gmail.com",
  //     password: "Twilight567",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vishaldhawan@gmail.com",
  //     password: "Aurora890",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "amitkumar@gmail.com",
  //     password: "Celestial123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshpanchal@gmail.com",
  //     password: "Galaxy456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojgupta@gmail.com",
  //     password: "Nebula789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "niteshgupta@gmail.com",
  //     password: "Meteorite101",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyankakumar@gmail.com",
  //     password: "LunarMoon234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sanjaykumar@gmail.com",
  //     password: "Solstice345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "abhishekverma@gmail.com",
  //     password: "Eclipse567",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepa joshi@gmail.com",
  //     password: "Comet890",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neha singh@gmail.com",
  //     password: "Venus123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rahulmehta@gmail.com",
  //     password: "Mars456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshkumar@gmail.com",
  //     password: "Saturn789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "mehtakashish@gmail.com",
  //     password: "Jupiter101",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rajeshkumar@gmail.com",
  //     password: "Sunshine123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajverma@gmail.com",
  //     password: "Happy2023!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunkumar@gmail.com",
  //     password: "India@2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sangeeta@gmail.com",
  //     password: "Passw0rd!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikrampatel@gmail.com",
  //     password: "Vikram#567",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neetu2020@gmail.com",
  //     password: "Neetu@2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyankasingh@gmail.com",
  //     password: "Priya12345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arvindsharma@gmail.com",
  //     password: "Sharma@789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neerajjain@gmail.com",
  //     password: "Jain@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sonia.k@gmail.com",
  //     password: "Sonia@pass",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "abhishek99@gmail.com",
  //     password: "Abhi@2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepakmittal@gmail.com",
  //     password: "Deepak$321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "lokeshchoudhary@gmail.com",
  //     password: "Lokesh#88",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "mehtams@gmail.com",
  //     password: "Mehta@123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rishiagrawal@gmail.com",
  //     password: "Rishi@2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divya.vishal@gmail.com",
  //     password: "Divya$2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "atulverma@gmail.com",
  //     password: "Atul@pass1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumanbhatt@gmail.com",
  //     password: "Sum#2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karansharma@gmail.com",
  //     password: "Karan@789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyapatil@gmail.com",
  //     password: "Priya@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arunsingh@gmail.com",
  //     password: "Password123!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajkumar@gmail.com",
  //     password: "SecurePass!45",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rohitsharma@gmail.com",
  //     password: "Rohit2024!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sanjaymishra@gmail.com",
  //     password: "Sanjay#789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vivektiwari@gmail.com",
  //     password: "Vivek@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyapatel@gmail.com",
  //     password: "Priya567!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilchauhan@gmail.com",
  //     password: "Anil#2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepakverma@gmail.com",
  //     password: "Deepak$199",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manishrathore@gmail.com",
  //     password: "Manish!2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "lalitgupta@gmail.com",
  //     password: "Lalit@789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ashokyadav@gmail.com",
  //     password: "Ashok#2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nikhilsingh@gmail.com",
  //     password: "Nikhil!45",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshkumar@gmail.com",
  //     password: "Harsh!2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshrawat@gmail.com",
  //     password: "Suresh@123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anupambose@gmail.com",
  //     password: "Anupam#567",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumitpatel@gmail.com",
  //     password: "Sumit!2021",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rameshsharma@gmail.com",
  //     password: "Ramesh#2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "krishnasingh@gmail.com",
  //     password: "Krishna!789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rahulkumar@gmail.com",
  //     password: "pass1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ankitmehta@gmail.com",
  //     password: "securepass56",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyasingh@gmail.com",
  //     password: "mypassword789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sanjaypatel@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepaksharma@gmail.com",
  //     password: "sh4rm@2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehajoshi@gmail.com",
  //     password: "neha5678",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vikashkumar@gmail.com",
  //     password: "vik@2022",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunravi@gmail.com",
  //     password: "arjun2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajgupta@gmail.com",
  //     password: "gptapass99",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "lavitasingh@gmail.com",
  //     password: "lavita2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nileshmore@gmail.com",
  //     password: "nilesh789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divyasaini@gmail.com",
  //     password: "diyas124",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "abhinavverma@gmail.com",
  //     password: "verma9876",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "krishnagupta@gmail.com",
  //     password: "krish@2021",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumitkumar@gmail.com",
  //     password: "sumit2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "saurabhpatel@gmail.com",
  //     password: "saurabh!23",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojsharma@gmail.com",
  //     password: "manojpass456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ankitrana@gmail.com",
  //     password: "rana2023",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rithickumar@gmail.com",
  //     password: "rithick@45",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "bhupendrakumar@gmail.com",
  //     password: "bhupen321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rahulkumar@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehamalik@gmail.com",
  //     password: "securePass!8",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunkumar@gmail.com",
  //     password: "mySecurePass9",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sunitasharma@gmail.com",
  //     password: "passWord!7",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyapandey@gmail.com",
  //     password: "Pr1yaPass",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vivekkumar@gmail.com",
  //     password: "V1vekKp@ss",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "kanikasharma@gmail.com",
  //     password: "Sh@rmApass2",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karanmehta@gmail.com",
  //     password: "K@ran2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anitaraj@gmail.com",
  //     password: "An!tarPass3",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "dineshpatel@gmail.com",
  //     password: "D1n3sh!p",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sonalik@gmail.com",
  //     password: "S0nAli$k",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "hemantgupta@gmail.com",
  //     password: "H3manTgUptA",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyaniyogi@gmail.com",
  //     password: "Niyogi!22",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rahulkishore@gmail.com",
  //     password: "R@hulK!sh0re",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshithk@gmail.com",
  //     password: "Har$hithK8",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sumanpatel@gmail.com",
  //     password: "SumanPa55",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "adityasingh@gmail.com",
  //     password: "AdiTyS1ngh",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "komalkumar@gmail.com",
  //     password: "K0m@lkP@ss",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "mohitsharma@gmail.com",
  //     password: "M0hit$haRmA",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divyamishra@gmail.com",
  //     password: "DivY@m123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "sureshkumar@gmail.com",
  //     password: "password123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyankapandey@gmail.com",
  //     password: "passw0rd!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunsingh@gmail.com",
  //     password: "qwerty2021",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nehakumari@gmail.com",
  //     password: "iloveyou!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vivekkumar@gmail.com",
  //     password: 123456789,
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rakshitikumar@gmail.com",
  //     password: "mypassword",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anandprajapati@gmail.com",
  //     password: "securepass!",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divyasharma@gmail.com",
  //     password: "welcome1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karanamohan@gmail.com",
  //     password: "pass1234",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ishaagarwal@gmail.com",
  //     password: "pass4321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "manojpatel@gmail.com",
  //     password: "helloWorld",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "deepalibhat@gmail.com",
  //     password: "sunshine7",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rahulgupta@gmail.com",
  //     password: "abc123xyz",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "santoshkumar@gmail.com",
  //     password: "qazwsx12",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "mehtabindira@gmail.com",
  //     password: "password1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anjalisaxena@gmail.com",
  //     password: "mypassword1",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ramitaprasad@gmail.com",
  //     password: "password321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "pankajmehta@gmail.com",
  //     password: "pass9876",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "rituchawla@gmail.com",
  //     password: "iloveyou2",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "subhraroy@gmail.com",
  //     password: "password789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "neerajkhan@gmail.com",
  //     password: "passNeeraj123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyankapatel@gmail.com",
  //     password: "securePriya456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "viveksharma@gmail.com",
  //     password: "VivekSecure789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anushkagupta@gmail.com",
  //     password: "AnushkaPass321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "ranjithsingh@gmail.com",
  //     password: "RanjithPwd654",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "karanmehta@gmail.com",
  //     password: "KaranM456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "divyanshiagarwal@gmail.com",
  //     password: "Divyanshi987",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "arjunsingh@gmail.com",
  //     password: "ArjunPass321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "surbhijain@gmail.com",
  //     password: "Surbhi2024",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "vanshpatel@gmail.com",
  //     password: "VanshP789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "lotusverma@gmail.com",
  //     password: "LotusVer456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "amanpawar@gmail.com",
  //     password: "AmanPaw789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "priyanshsharma@gmail.com",
  //     password: "Priyansh123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "raghavsinha@gmail.com",
  //     password: "RaghavPass654",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anishkumar@gmail.com",
  //     password: "AnishK789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "meghnaraj@gmail.com",
  //     password: "MeghnaRaj321",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "harshvardhansingh@gmail.com",
  //     password: "HarshV123",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "bhavikpatel@gmail.com",
  //     password: "BhavikP456",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "akshatsrivastava@gmail.com",
  //     password: "AkshatS789",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "nikaantandon@gmail.com",
  //     password: "NikaanT012",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "shrutikapandey@gmail.com",
  //     password: "ShrutiP345",
  //     email_confirm: true,
  //   },
  //   {
  //     email: "anilkumar@gmail.com",
  //     password: "AnilK567",
  //     email_confirm: true,
  //   },
  // ];
  // const results = [];

  //   for (const user of Users) {
  //     // Ensure email_confirm is boolean and password is string
  //     const safeUser = {
  //       ...user,
  //       password: String(user.password)
  //     };

  //     const { data, error } = await supabase.auth.admin.createUser(safeUser);

  //     if (error) {
  //       console.error("❌ Error creating user:", user.email, error.message);
  //       results.push({ email: user.email, error: error.message });
  //     } else {
  //       console.log("✅ Created:", user.email, data.user.id);
  //       results.push({ email: user.email, id: data.user.id });
  //     }
  //   }

  const { data, error } = await await supabase.auth.admin.listUsers({
    page: 2,
    perPage: 50,
  });

  const userIds = data.users.map((user) => user.id);

  console.log(error);

  return Response.json(userIds);
}
