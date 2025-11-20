# Impact and Metrics

This section documents performance and scalability considerations based on the current implementation. The repository does not include automated benchmarking, so notes are observational and derived from architecture.

## Performance Observations

- AI requests are synchronous: each `POST /api/v1/sessions` call waits for Gemini to respond. Response time depends primarily on the external AI provider and network latency.
- The Sandpack preview runs entirely in the browser and does not impact backend performance.

## Scalability Assumptions

- Backend is serverless-compatible. Deploying to AWS Lambda with API Gateway allows horizontal scaling to handle concurrent requests. However, large concurrency may increase cost and may cause cold starts.
- MongoDB Atlas is recommended for production to handle data scale and provide managed replicas for reliability.

## API Response Time Notes

- No automated timing present in the code. Typical response time to generate a component will be dominated by the AI provider call. Add request timing and retry logic in `GeminiController` to measure and improve reliability.

## Testing Results

- There are no unit or integration tests in the repository. Manual testing steps are provided in `TESTING_GUIDE.md`.
