class ComponentRegistry{
    #registry = new Map();
    addMountedComponent(component){
        this.#registry.set(component.id, component)
    }
    removeUnmountedComponent(id){
        this.#registry.delete(id)
    }
    didMount(id){
        console.log(this.#registry)
        return this.#registry.has(id)
    }
    getMountedComponent(id){
        return this.#registry.get(id)
    }
}

const registry = new ComponentRegistry()
Object.seal(registry);
export default registry;