declare global {
  type ConceptsData = {
    numberOfConcepts: number;
    concepts: Concept[];
  };

  type Concept = {
    id: string;
    terminologyName: string;
    prefLabel: string;
    terminologyLabel: string;
    terminologyTitle: string;
    definition: string;
    code: string;
    dcType: string | null;
  };

  type Terminology = {
    terminologyId: string;
    title: string;
    uri: string;
    date: string;
    theme: string;
    version: string;
    licence: {
      label: string;
      homepage: string;
    };
    legalPersons: [
      {
        label: string;
        homepage: string;
      }
    ];
  };

  type TerminologiesData = {
    numberOfTerminologies: number;
    terminologies: Terminology[];
  };
}

export {};
