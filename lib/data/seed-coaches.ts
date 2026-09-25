import type { ICoach } from "@/models/schemas";
import { siteImages } from "@/lib/data/site-images";
import { driveManifest } from "@/lib/images/drive-assets";

const posters = driveManifest.coaches as Record<string, string | undefined>;

function coachPhoto(name: string, fallback = siteImages.benchGear): string {
  return posters[name] ?? fallback;
}

export const defaultCoaches: ICoach[] = [
  {
    name: "TJ Anderson",
    title: "Founder, CEO, Head Coach",
    bio: `Meet Coach TJ Anderson

Coach TJ Anderson has dedicated more than a decade to developing young basketball players and expanding travel basketball opportunities throughout Central Pennsylvania.

As CEO and Head Coach of the Central PA Lions AAU/Travel Program, Coach Anderson has guided boys' and girls' teams to championships in Pennsylvania, West Virginia, Maryland, and New York. Since 2020, his teams have earned titles at the Ocean City tournament, the West Virginia Championships, the XGen Buffalo Championships, the Keyser WV Classic, the Tucker WV tournament, and the State College Elementary Championship. His 2025–26 team also finished as the Spooky Nook Pennsylvania Elementary runner-up.

Coach Anderson is also the founder and head coach of the Juniata Valley Stingers, a program he established in Alexandria, Pennsylvania, in 2014. Under his leadership, the Stingers became Ocean City AAU and Pittsburgh champions while earning runner-up finishes in West Virginia, Maryland, and Virginia.

Beyond the trophies, Coach Anderson remains committed to teaching teamwork, discipline, confidence, and character. His mission is to provide young athletes with opportunities to compete, grow, and become successful both on and off the basketball court.

One Team. One Family. One Purpose.`,
    featured: true,
    order: 0,
    published: true,
    photo: coachPhoto("TJ Anderson"),
    photoAlt: "Coach TJ Anderson",
  },
  {
    name: "Shane Kelly",
    title: "Jr High Boys Head Coach",
    bio: `MEET THE COACH: SHANE KELLY

The Central PA Lions are proud to recognize Coach Shane Kelly, a dedicated leader who continues to make a positive impact on our young athletes.

Coach Kelly has helped guide Central PA Lions teams to success at several competitive events. His junior high team earned a runner-up finish at The Bridge Sports Complex in Bridgeport, West Virginia.

During the 2024–2025 season, Coach Kelly led his elementary team to championships at both the Keyser WV Classic and the Tucker WV tournament. These accomplishments reflect his leadership, preparation, and commitment to helping players improve.

Beyond tournament results, Coach Kelly is dedicated to teaching teamwork, discipline, confidence, and sportsmanship. His goal is to help every athlete develop as a basketball player while creating memories and relationships that extend beyond the game.

Thank you, Coach Kelly, for everything you do for our players and the Central PA Lions family!

Play • Develop • Compete • Belong — More Than a Game`,
    featured: true,
    order: 1,
    published: true,
    photo: coachPhoto("Shane Kelly"),
    photoAlt: "Coach Shane Kelly",
  },
  {
    name: "Bryan Kulick",
    title: "High School Boys Head Coach",
    bio: `MEET THE COACH: BRYAN KULICK

The Central PA Lions are proud to introduce Coach Bryan Kulick, our High School Boys Head Coach and a dedicated leader within the Lions basketball family.

Coach Kulick brings an impressive championship background to the program. His teams have competed successfully throughout Pennsylvania, West Virginia, Maryland, and New York.

His accomplishments include an Ocean City championship during the 2020–2021 season, followed by the West Virginia and XGen Buffalo championships in 2021–2022. His teams returned to Buffalo the following season and captured another XGen championship.

During the 2023–2024 season, his teams earned the West Virginia Boys and Girls championships, along with the Junior High XGen Buffalo championship. The success continued with elementary championships at the Keyser WV Classic and Tucker, West Virginia, during the 2024–2025 season.

In 2025–2026, his teams captured another Keyser WV Classic title and the State College, Pennsylvania Elementary Championship before earning a runner-up finish at Spooky Nook.

Coach Kulick's experience, leadership, and commitment to player development make him an important part of the Central PA Lions program. He continues to challenge his players to compete, improve, support their teammates, and represent the Lions with pride.

Thank you, Coach Kulick, for your dedication to our athletes and the entire Central PA Lions family!`,
    featured: true,
    order: 2,
    published: true,
    photo: coachPhoto("Bryan Kulick"),
    photoAlt: "Coach Bryan Kulick",
  },
  {
    name: "Brandon Myers",
    title: "Head Girls Coach",
    bio: `MEET THE COACH: BRANDON MYERS

The Central PA Lions are proud to recognize Coach Brandon Myers, our Head Girls Coach and a dedicated leader within the Lions basketball family.

Coach Myers has helped build a successful girls basketball program centered on teamwork, player development, and competitive excellence. In 2023, he guided the Central PA Lions girls to the NY X-Gen Championship.

The success continued during the 2023–2024 season, when his teams earned both the West Virginia Championship and the Girls West Virginia Championship. In 2024, his junior high team also recorded an impressive runner-up finish in Tridelphia, West Virginia.

Coach Myers is committed to helping young athletes strengthen their skills, confidence, discipline, and understanding of the game. His leadership encourages players to compete together, support one another, and represent the Central PA Lions with pride.

Thank you, Coach Myers, for your dedication to our players and the entire Central PA Lions family!`,
    featured: true,
    order: 3,
    published: true,
    photo: coachPhoto("Brandon Myers"),
    photoAlt: "Coach Brandon Myers",
  },
  {
    name: "Tim Mills",
    title: "4th Grade Elementary Coach",
    bio: `MEET THE COACH: TIM MILLS

The Central PA Lions are proud to recognize Coach Tim Mills, our 4th Grade Elementary Coach and a valued member of the Lions basketball family.

Coach Mills brings a wealth of knowledge and experience from the P-O Elementary Basketball League. His success includes winning the March Madness Tournament at the Greater Susquehanna Valley YMCA.

Coach Mills is also coming off back-to-back 3rd–6th Grade P-O League championships—an accomplishment that reflects his leadership, preparation, and ability to help young athletes succeed as a team.

Beyond winning championships, Coach Mills is committed to teaching basketball fundamentals, teamwork, discipline, confidence, and sportsmanship. His experience working with elementary players makes him an important part of our mission to build a strong foundation for the next generation of Central PA Lions.

We are truly blessed to have Coach Mills and his family within our program. Thank you, Coach Mills, for your dedication to our athletes and the entire Central PA Lions family!`,
    featured: true,
    order: 4,
    published: true,
    photo: coachPhoto("Tim Mills"),
    photoAlt: "Coach Tim Mills",
  },
];
