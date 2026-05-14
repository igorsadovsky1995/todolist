import type { Ref } from "react";

export const useCombineRef = <T>(...refs: Array<Ref<T> | null>) => {
    return (node: T | null) => {
        refs.forEach((ref) => {
            if(!ref){
                return
            }

            if(typeof ref === 'function'){
                ref(node)
            }else{
                ref.current = node;
            }
        });
    }
}