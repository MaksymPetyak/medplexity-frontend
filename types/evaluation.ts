// TODO: need to really enforce more type consistency
export interface EvaluationResult {
  id?: string;
  input: Record<string, any> | string;
  inputMetadata: Record<string, any> | null;
  expectedOutput: string;
  output: Record<string, any> | string;
  outputMetadata: Record<string, any> | null;
  correct: boolean | null;
}

export interface FailedEvaluation {
  datapoint: any;
  error: string;
}

export interface EvaluationSummary {
  evaluationResults: EvaluationResult[];
  failedEvaluations: FailedEvaluation[];
  promptTemplate?: string;
  date?: string;
}
