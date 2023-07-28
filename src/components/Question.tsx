import { type Question as dbQuestion } from "@prisma/client";
import { capitalize } from "~/utils/strings";

export default function Question({ data }: { data: dbQuestion }) {
  if (!data) {
    return null;
  }

  // This filter gets rid of empty objects
  const resources = data.resources.filter(Boolean).map((r, index) => (
    <span key={index}>
      <a
        key={`resource-${r}-${index}`}
        href={r}
        target="_blank"
        rel="noreferrer noopener"
        className="font-mono text-xs hover:underline md:text-base"
      >
        {r.replace("https://", "")}
      </a>
      {index < data.resources.length - 1 && ", "}
    </span>
  ));

  return (
    <div className="mb-4 flex flex-col gap-2 rounded-lg border-2 border-gray-300 p-4">
      <p>
        <b>Technology</b>:{" "}
        <span className="font-mono">{capitalize(data.technology)}</span>
      </p>
      <p>
        <b>Question</b>: {data.title}
      </p>
      <p>
        <b>Answer</b>: {data.answer}
      </p>
      {resources.length > 0 && (
        <p className="overflow-hidden text-ellipsis">
          <b>Resources</b>: {resources}
        </p>
      )}
    </div>
  );
}
