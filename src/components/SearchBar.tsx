import { useState } from "react";
import FormInput from "./form/FormInput";
import FormButton from "./form/FormButton";
import { api, apiErrorAlert } from "~/utils/api";
import { type Question } from "@prisma/client";

interface Props {
  onSearchDone: (results: Question) => void;
}

export default function SearchBar({ onSearchDone }: Props) {
  const [text, textSet] = useState("");
  const [submittingForm, submittingFormSet] = useState(false);

  const { mutate: searchMutation } = api.questions.search.useMutation({
    onMutate: () => {
      submittingFormSet(true);
    },
    onSuccess: (result) => {
      if (!result) {
        return;
      }
      onSearchDone(result);
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
      <form className="flex flex-col gap-1">
        <FormInput
          type="text"
          label="Search"
          value={text}
          onChange={(e) => textSet(e.target.value)}
        />
        <FormButton
          label="Search"
          disabled={submittingForm}
          onClick={(e) => {
            e.preventDefault();
            searchMutation(text);
          }}
        />
      </form>
    </>
  );
}
