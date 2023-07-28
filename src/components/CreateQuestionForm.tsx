import { useRouter } from "next/router";
import { useState } from "react";
import { api, apiErrorAlert } from "~/utils/api";
import { acceptedTechnologies } from "~/utils/constants";
import { capitalize } from "~/utils/strings";
import FormButton from "./form/FormButton";
import FormInput from "./form/FormInput";
import FormSelect from "./form/FormSelect";

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
      alert(
        "Your question has been submitted succesfully! Our mods will now work on verifying and approving it, if it meets our veracity criteria."
      );
      route.reload();
    },
    onError: (e) => {
      apiErrorAlert(e.data?.zodError?.fieldErrors.content?.[0]);
    },
    onSettled: () => {
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
          onChange={(e) => {
            technologySet(e.target.value);
          }}
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
        <FormButton
          label="Submit question for approval"
          disabled={submittingForm}
          onClick={() => {
            createMutation({
              technology,
              title,
              answer,
              resources: resources.split(","),
            });
          }}
        />
      </form>
    </>
  );
}
