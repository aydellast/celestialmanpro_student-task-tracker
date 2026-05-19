export const determinePriority = (
  dueDate: Date,
  sks: number,
  difficulty: number
): number => {
  const now = new Date();

  // Selisih hari deadline
  const diffTime =
    dueDate.getTime() - now.getTime();

  const diffDays =
    diffTime / (1000 * 60 * 60 * 24);

  let score = 0;

  // ======================
  // DEADLINE SCORE
  // ======================

  if (diffDays <= 2) {
    score += 5;
  } else if (diffDays <= 7) {
    score += 3;
  } else {
    score += 1;
  }

  // ======================
  // SKS SCORE
  // ======================

  if (sks >= 5) {
    score += 5;
  } else if (sks >= 3) {
    score += 3;
  } else {
    score += 1;
  }

  // ======================
  // DIFFICULTY SCORE
  // ======================

  if (difficulty >= 4) {
    score += 5;
  } else if (difficulty >= 2) {
    score += 3;
  } else {
    score += 1;
  }

  // ======================
  // FINAL PRIORITY
  // ======================

  // HIGH
  if (score >= 12) {
    return 1;
  }

  // MEDIUM
  if (score >= 7) {
    return 2;
  }

  // LOW
  return 3;
};