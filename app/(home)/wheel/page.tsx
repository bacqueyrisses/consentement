import { auth } from "@/auth";
import WheelWrapper from "@/components/wheel-wrapper";
import { signout } from "@/lib/actions/auth";
import { sql } from "@vercel/postgres";
import { notFound } from "next/navigation";

export default async function Page() {
  const session = await auth();
  const user = session?.user;
  if (!user) notFound();

  const result = await sql`
      SELECT id, description, value
      FROM questions
      ORDER BY date DESC
`;

  const questions = result.rows;

  return (
    <>
      <p
        className="mt-6 animate-fade-up text-center text-lg text-gray-500 opacity-0 [text-wrap:balance] md:text-xl"
        style={{ animationDelay: "0.25s", animationFillMode: "forwards" }}
      >
        Répondez aux questions suivantes.
      </p>
      <WheelWrapper user={user} questions={questions} />
      <form action={signout}>
        <button className="flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
          <div className="hidden md:block">Sign Out</div>
        </button>
      </form>
    </>
  );
}
