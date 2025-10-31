class ComponentRegistry{
    #registry = new Map();

    addMountedComponent(component){
        this.#registry.set(component.id, component)
    }
    removeUnmountedComponent(id){
        const component = this.getMountedComponent(id);
        this.#registry.delete(id)
    }
    didMount(id){
        return this.#registry.has(id)
    }
    getMountedComponent(id){
        return this.#registry.get(id)
    }
}

const registry = new ComponentRegistry()
Object.seal(registry);
export default registry;