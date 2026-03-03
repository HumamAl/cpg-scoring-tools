"use client";

import type { ReactNode } from "react";
import { ChallengeCard } from "./challenge-card";
import { ApiKeyArchitecture } from "./api-key-architecture";
import { ComponentWrapperDiagram } from "./component-wrapper-diagram";
import { ClerkMiddlewareFlow } from "./clerk-middleware-flow";
import type { Challenge } from "@/lib/types";

interface ChallengePageContentProps {
  challenges: Challenge[];
}

export function ChallengePageContent({ challenges }: ChallengePageContentProps) {
  const visualizations: Record<string, ReactNode> = {
    "challenge-1": <ApiKeyArchitecture />,
    "challenge-2": <ComponentWrapperDiagram />,
    "challenge-3": <ClerkMiddlewareFlow />,
  };

  return (
    <div className="flex flex-col gap-4">
      {challenges.map((challenge, index) => (
        <ChallengeCard
          key={challenge.id}
          title={challenge.title}
          description={challenge.description}
          outcome={challenge.outcome}
          index={index}
        >
          {visualizations[challenge.id] ?? null}
        </ChallengeCard>
      ))}
    </div>
  );
}
