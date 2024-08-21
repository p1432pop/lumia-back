import { AxiosQueuePriority } from './axios.enum';

// Priority is ignored with rate limiter in bull
// Maybe only work with bullmq
// https://github.com/taskforcesh/bullmq/issues/214
// https://github.com/OptimalBits/bull/issues/1053
export interface AxiosQueueOptions {
  /**
   * The total number of attempts to try the job until it completes.
   * @defaultValue 3
   */
  attempts?: number;
  /**
   * Ranges from 1 (highest priority) to 3 (lowest priority).
   * @defaultValue 1
   */
  priority?: AxiosQueuePriority;

  /**
   * An amount of milliseconds to wait until this job can be processed.
   * @defaultValue 0
   */
  delay?: number;
}
