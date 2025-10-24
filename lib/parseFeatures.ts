export const parseFeatures = (features: any): string[] => {
    if (!features) return [];
    
    if (Array.isArray(features)) {
      return features.filter((item): item is string => 
        typeof item === 'string' && item.trim() !== ''
      );
    }
    
    if (typeof features === 'string') {
      try {
        const parsed = JSON.parse(features);
        return Array.isArray(parsed) 
          ? parsed.filter((item): item is string => typeof item === 'string')
          : [];
      } catch {
        return [];
      }
    }
    
    return [];
  }