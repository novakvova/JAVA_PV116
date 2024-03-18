# Learn about building .NET container images:
# https://github.com/dotnet/dotnet-docker/blob/main/samples/README.md
FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build

WORKDIR /source

# copy csproj and restore as distinct layers
WORKDIR /app

WORKDIR /src

COPY ["WebKrot/WebKrot.csproj", "WebKrot/"]
RUN dotnet restore "WebKrot/WebKrot.csproj"

# copy everything else and build app
COPY . .
WORKDIR /src/WebKrot
RUN dotnet build "WebKrot.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "WebKrot.csproj" -c Release -o /app/publish

FROM mcr.microsoft.com/dotnet/aspnet:7.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "WebKrot.dll"]
