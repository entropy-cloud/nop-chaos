<!--
/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
-->
<template>
  <div ref="domRef"></div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref, onBeforeUnmount } from 'vue';
import { ToastComponent } from 'amis';
import { createRoot } from 'react-dom/client';
import { createElement, Fragment } from 'react';

const domRef: Ref<HTMLElement | undefined> = ref();

let root;

onMounted(() => {
  root = createRoot(domRef.value!);
  root.render(createElement(Fragment, {}, createElement(ToastComponent, { position: 'top-right' })));
});

onBeforeUnmount(() => {
  if (root) {
    root.unmount();
    root = undefined;
  }
});
</script>
