// TODO: need to really enforce more type consistency
export interface EvaluationResult {
  input: Record<string, any>;
  inputMetadata: Record<string, any> | null;
  expectedOutput: string;
  output: Record<string, any>;
  outputMetadata: Record<string, any> | null;
  correct: boolean;
}

export interface FailedEvaluation {
  datapoint: any;
  error: string;
}

export interface EvaluationSummary {
  evaluationResults: EvaluationResult[];
  failedEvaluations: FailedEvaluation[];
}
