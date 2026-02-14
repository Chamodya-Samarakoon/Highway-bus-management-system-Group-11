import SubmitFeedback from "../passenger/SubmitFeedback";

/**
 * Optional: allow public feedback page too.
 * If your backend requires login, keep this page but it will redirect in SubmitFeedback.
 */
export default function FeedbackPublic() {
    return <SubmitFeedback />;
}
