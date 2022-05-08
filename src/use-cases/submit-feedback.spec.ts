import { exec } from "child_process";
import { SubmitFeedbackUseCase } from "./submit-feedback";

const createFeedbackSpy = jest.fn();
const sendMailSpy = jest.fn();

const submitFeedbackUseCase = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: sendMailSpy }
);

describe("Submit feedback", () => {
  it("should be able to submit a feedback", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "data:image/png;base64,sjnfdksjhekfuweipfsklcvfjm",
      })
    ).resolves.not.toThrow();

    expect(createFeedbackSpy).toHaveBeenCalled();
    expect(sendMailSpy).toHaveBeenCalled();
  });

  it("should not be able to submit feedback without type", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "",
        comment: "example comment",
        screenshot: "data:image/png;base64,sjnfdksjhekfuweipfsklcvfjm",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback without comment", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "",
        screenshot: "data:image/png;base64,sjnfdksjhekfuweipfsklcvfjm",
      })
    ).rejects.toThrow();
  });

  it("should not be able to submit feedback if the format screenshot is invalid", async () => {
    await expect(
      submitFeedbackUseCase.execute({
        type: "BUG",
        comment: "example comment",
        screenshot: "test.png",
      })
    ).rejects.toThrow();
  });
});
