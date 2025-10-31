class ComponentRegistry{
    #registry = new Map();

    addMountedComponent(component){
        this.#registry.set(component.id, component)
    }
    removeUnmountedComponent(id){
        this.#registry.delete(id)
    }
    didMount(id){
        return this.#registry.has(id)
    }
    getMountedComponent(id){
        const component = this.#registry.get(id);
        return component
    }
}

const registry = new ComponentRegistry()
Object.seal(registry);
export default registry;