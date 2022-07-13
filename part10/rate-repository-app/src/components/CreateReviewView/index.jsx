import { Formik } from "formik";
import CreateReviewForm from "./CreateReviewForm";
import * as yup from "yup";
import { CREATE_REVIEW } from "../../graphql/mutations";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";

const initialValues = {
  ownerName: "",
  repositoryName: "",
  rating: "",
  text: "",
};

const validationSchema = yup.object().shape({
  ownerName: yup
    .string("Name of the owner must be a string")
    .required("Name of the owner of the repository is required"),
  repositoryName: yup
    .string("Name of the repository must be a string")
    .required("Name of the repository is required"),
  rating: yup
    .number()
    .typeError("Rating must be a number")
    .min(0, "Rating must be between 0-100")
    .required("Rating is required")
    .max(100, "Rating must be between 0-100")
    .integer("Rating must be an integer"),
  text: yup.string("Rating must be a string"),
});

const CreateReviewView = () => {
  const [createReview] = useMutation(CREATE_REVIEW);
  const navigate = useNavigate();

  const onSubmit = async ({ ownerName, rating, repositoryName, text }) => {
    try {
      let reviewInfo = {
        repositoryName,
        ownerName,
        rating: Number(rating),
      };

      if (text) {
        reviewInfo = {
          ...reviewInfo,
          text,
        };
      }

      const createdReview = await createReview({
        variables: { review: reviewInfo },
      });

      const repositoryId = createdReview.data.createReview.repositoryId;
      navigate(`/repositories/${repositoryId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {({ handleSubmit }) => <CreateReviewForm onSubmit={handleSubmit} />}
    </Formik>
  );
};

export default CreateReviewView;
