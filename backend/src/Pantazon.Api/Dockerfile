# Acesse https://aka.ms/customizecontainer para saber como personalizar seu contêiner de depuração e como o Visual Studio usa este Dockerfile para criar suas imagens para uma depuração mais rápida.

# Esta fase é usada durante a execução no VS no modo rápido (Padrão para a configuração de Depuração)
FROM mcr.microsoft.com/dotnet/aspnet:10.0 AS base
USER $APP_UID
WORKDIR /app
EXPOSE 8080
EXPOSE 8081


# Esta fase é usada para compilar o projeto de serviço
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /src

COPY ["backend/src/Pantazon.Api/Pantazon.Api.csproj", "Pantazon.Api/"]
COPY ["backend/src/Pantazon.Application/Pantazon.Application.csproj", "Pantazon.Application/"]
COPY ["backend/src/Pantazon.Domain/Pantazon.Domain.csproj", "Pantazon.Domain/"]
COPY ["backend/src/Pantazon.Infrastructure/Pantazon.Infrastructure.csproj", "Pantazon.Infrastructure/"]
COPY ["backend/src/Pantazon.Shared/Pantazon.Shared.csproj", "Pantazon.Shared/"]

RUN dotnet restore "Pantazon.Api/Pantazon.Api.csproj"

COPY backend/src .

WORKDIR /src/Pantazon.Api

RUN dotnet build "Pantazon.Api.csproj" -c Release -o /app/build

# Esta fase é usada para publicar o projeto de serviço a ser copiado para a fase final
FROM build AS publish
ARG BUILD_CONFIGURATION=Release
RUN dotnet publish "./Pantazon.Api.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Esta fase é usada na produção ou quando executada no VS no modo normal (padrão quando não está usando a configuração de Depuração)
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Pantazon.Api.dll"]