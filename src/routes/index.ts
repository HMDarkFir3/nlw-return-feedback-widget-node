import express from "express";

import { PrismaFeedbacksRepository } from "../repositories/prisma/prisma-feedbacks";
import { NodemailMailAdapter } from "../adapters/nodemailer/nodemailer-mail";
import { SubmitFeedbackUseCase } from "../use-cases/submit-feedback";

export const routes = express.Router();

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbackRepository = new PrismaFeedbacksRepository();
  const nodemailerMailAdapter = new NodemailMailAdapter();

  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  );

  await submitFeedbackUseCase.execute({
    type,
    comment,
    screenshot,
  });

  return res.status(201).send();
});
