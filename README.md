# JWT Authentication Demo

Implementation of JWT Authentication in Angular SPA + ASP.NET Core web API

## Best Practices

- Use a random complicated key (`JWT Secret`) to make brute forcing the token very hard.
- Don't extract the algorithm from the header. Force the algorithm in the backend (`HS256` or `RS256`).
- Make token expiration (`TTL`, `RTTL`) as short as possible.
- Don't store sensitive data in the JWT payload, it can be decoded easily.

---

## References

- [shieldfy/API-Security-Checklist](https://github.com/shieldfy/API-Security-Checklist)
- [dotnet-labs/JwtAuthDemo](https://github.com/dotnet-labs/JwtAuthDemo)