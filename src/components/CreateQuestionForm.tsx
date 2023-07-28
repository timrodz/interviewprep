import { useState } from "react";
import FormSelect from "./Select";
import { acceptedTechnologies } from "~/utils/constants";
import FormInput from "./Input";
import { capitalize } from "~/utils/strings";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

const formAcceptedTechnologies = [
  "Choose a technology",
  ...acceptedTechnologies.map((t) => capitalize(t)),
];

export default function CreateQuestionForm() {
  const route = useRouter();
  const [technology, technologySet] = useState<string>(
    // This value should always be set
    formAcceptedTechnologies[0]!
  );

  const [title, titleSet] = useState<string>("");
  const [answer, answerSet] = useState<string>("");
  const [resources, resourcesSet] = useState<string>("");

  const [submittingForm, submittingFormSet] = useState(false);

  const { mutate: createMutation } = api.questions.create.useMutation({
    onMutate: () => {
      submittingFormSet(true);
    },
    onSuccess: () => {
      submittingFormSet(false);
      route.reload();
      alert(
        "Your question has been submitted succesfully! Our mods will now work on verifying and approving it, if it meets our veracity criteria."
      );
    },
    onError: (e) => {
      submittingFormSet(false);
      const errorMessage = e.data?.zodError?.fieldErrors.content;
      if (errorMessage?.[0]) {
        alert(`An error ocurred: ${errorMessage[0]}. Please try again later.`);
      } else {
        alert(`An unknown error ocurred. Please try again later.`);
      }
    },
    onSettled: () => {
      console.log("settled");
      submittingFormSet(false);
    },
  });

  return (
    <>
      <form className="my-4 flex flex-col gap-2">
        <FormSelect
          label="Technology"
          options={formAcceptedTechnologies}
          value={technology}
          onChange={(e) => technologySet(e.target.value)}
        />
        <FormInput
          type="text"
          label="Title"
          value={title}
          onChange={(e) => titleSet(e.target.value)}
        />
        <FormInput
          type="textarea"
          label="Answer"
          value={answer}
          onChange={(e) => answerSet(e.target.value)}
        />
        <FormInput
          type="text"
          label="Resources"
          description="Comma-separated values (ex: A, B, C)"
          value={resources}
          onChange={(e) => resourcesSet(e.target.value)}
        />
        <button
          type="submit"
          className="rounded border-2 border-indigo-500 bg-indigo-500 px-4 py-2 text-white hover:underline"
          disabled={submittingForm}
          onClick={() => {
            createMutation({
              technology,
              title,
              answer,
              resources,
            });
          }}
        >
          Submit question for approval
        </button>
      </form>
    </>
  );
}
