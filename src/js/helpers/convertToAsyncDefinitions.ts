import { defineAsyncComponent } from 'vue';

type AsyncComponentsMap = Record<string, ReturnType<typeof defineAsyncComponent>>;

const convertToAsyncDefinitions = <T>(
    componentsMap: Record<string, Parameters<typeof defineAsyncComponent<T>>[0]>
): AsyncComponentsMap => {
    return Object.entries(componentsMap).reduce<AsyncComponentsMap>(
        (acc, [componentKey, componentImport]) => {
            acc[componentKey] = defineAsyncComponent(componentImport);

            return acc;
        },
        {}
    );
};

export default convertToAsyncDefinitions;
