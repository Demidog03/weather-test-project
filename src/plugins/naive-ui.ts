import type { App } from 'vue';
import {
    create,
    NButton,
    NCard,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutSider,
    NMenu,
    NMessageProvider,
    NInput,
    NAlert,
    NSpin,
    NGrid,
    NGridItem,
    NStatistic,
    NSpace,
    NDivider,
    NText,
    NH1,
    NH2,
    NH3,
    NH4,
    NList,
    NListItem,
    NTag,
    NThing,
    NIcon,
    NInputGroup,
    NEmpty,
    NSkeleton
} from 'naive-ui';

const naive = create({
    components: [
        NButton,
        NCard,
        NLayout,
        NLayoutHeader,
        NLayoutContent,
        NLayoutSider,
        NMenu,
        NMessageProvider,
        NInput,
        NAlert,
        NSpin,
        NGrid,
        NGridItem,
        NStatistic,
        NSpace,
        NDivider,
        NText,
        NH1,
        NH2,
        NH3,
        NH4,
        NList,
        NListItem,
        NTag,
        NThing,
        NIcon,
        NInputGroup,
        NEmpty,
        NSkeleton
    ]
});

export function createNaiveUi() {
    return {
        install(app: App) {
            app.use(naive);
        }
    };
}
