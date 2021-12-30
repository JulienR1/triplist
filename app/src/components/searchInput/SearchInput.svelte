<script lang="ts">
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    export let options: string[];
    export let placeholder = "";

    let userInput: string = "";
    let optionsContainer: HTMLUListElement;
    let inputField: HTMLInputElement;
    let currentOptionIndex = 0;

    $: formattedOptions = options
        .map((option, index) => ({ id: index, raw: option }))
        .filter((option) => option.raw.includes(userInput))
        .map((option) => ({
            ...option,
            content: option.raw
                .split(userInput || undefined)
                .reduce((total, current, index) => {
                    return index === 0 ? [current] : [...total, userInput, current];
                }, [])
                .filter((text) => text !== ""),
        }));

    const handleNavigationKey = ({ key }: KeyboardEvent) => {
        const setNewIndex = (targetNewIndex: number) => {
            if (targetNewIndex !== currentOptionIndex) {
                currentOptionIndex = Math.min(optionsContainer.childNodes.length, Math.max(0, targetNewIndex));
                (optionsContainer.childNodes[currentOptionIndex] as HTMLElement)?.focus();
            }
        };

        if (key === "ArrowUp") {
            setNewIndex(currentOptionIndex - 1);
        } else if (key === "ArrowDown") {
            setNewIndex(currentOptionIndex + 1);
        }
    };

    const handleItemSelect = ({ target }: Event, selectedValueIndex: number) => {
        inputField.focus();
        userInput = options[selectedValueIndex];
        updateSelectedOptionIndex(target);
        submitValue();
    };

    const handleItemKeypress = ({ key, target }: KeyboardEvent) => {
        if (key.includes("Enter")) {
            (target as HTMLElement).click();
        }
    };

    const updateSelectedOptionIndex = (selectedElement: EventTarget) => {
        optionsContainer.childNodes.forEach((node, index) => {
            if (selectedElement === node) {
                currentOptionIndex = index;
                return;
            }
        });
    };

    const handleSubmitPressed = ({ key }: KeyboardEvent) => {
        if (key.includes("Enter")) {
            submitValue();
        } else if (key === "Escape") {
            inputField.blur();
        }
    };

    const submitValue = () => {
        if (options[currentOptionIndex] === userInput || options.find((option) => option === userInput)) {
            inputField.blur();
            dispatch("select", userInput);
        } else {
            dispatch("deny");
        }
    };
</script>

<div class="search-input" on:keydown={handleNavigationKey}>
    <input type="text" bind:value={userInput} {placeholder} tabindex="0" on:keydown={handleSubmitPressed} bind:this={inputField} />
    <ul class="options" bind:this={optionsContainer}>
        {#each formattedOptions as option (option.id)}
            <li tabindex="0" on:click={(event) => handleItemSelect(event, option.id)} on:keydown={handleItemKeypress} on:focus={({ target }) => updateSelectedOptionIndex(target)}>
                {#each option.content as text}
                    {#if text === userInput}
                        <strong>{text}</strong>
                    {:else}
                        {text}
                    {/if}
                {/each}
            </li>
        {/each}
    </ul>
</div>

<style lang="scss">
    .search-input {
        display: block;
        position: relative;
        width: 100%;
    }

    input {
        width: 100%;
    }

    .options {
        width: 100%;
        position: absolute;
        list-style-type: none;
        border: 1px solid var(--darker-grey-white);
        background-color: var(--white);
        border-radius: 4px;
        z-index: 1;

        visibility: hidden;
        opacity: 0;

        li {
            position: relative;
            display: block;
            padding: 2px 6px;
            cursor: pointer;

            &:not(:last-of-type)::after {
                content: "";
                width: 100%;
                display: block;
                border-bottom: 1px solid var(--darker-grey-white);
            }

            &:hover,
            &:focus,
            &:focus-within,
            &:focus-visible {
                background: var(--white);
                outline: var(--dark-grey) auto 1px;
            }
        }
    }

    .search-input:focus-within .options,
    input:focus + .options,
    .options:focus,
    .options:focus-within,
    .options:hover {
        visibility: visible;
        opacity: 1;
    }

    strong {
        font-weight: var(--bold);
    }
</style>
