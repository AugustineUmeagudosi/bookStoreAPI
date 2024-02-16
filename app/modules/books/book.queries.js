export default {
  createPlan: `
    INSERT INTO plans(reference, name, price, benefits, duration)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING reference, name, price, duration, benefits, created_at;
  `,

  updatePlan: `
    UPDATE plans
    SET name = $2, price = $3, benefits = $4, duration = $5
    WHERE reference = $1
    RETURNING reference, name, price, duration, benefits, created_at;
  `,

  getPlan: `
    SELECT reference, name, price, duration, benefits, created_at
    FROM plans
    WHERE reference = $1;
  `,

  getPlans: `
    SELECT reference, name, price, duration, benefits, created_at
    FROM plans;
  `,
};
