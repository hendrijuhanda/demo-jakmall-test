export interface Error {
  key: string
  messages: Record<'validation' | 'message', string>[]
}

export interface Valid {
  key: string
  validations: string[]
}

export type Rules = 'required'

export interface RuleCustom {
  rule: string
  handler: (key: string, val: any, opts?: RuleOptions) => null | string
}

export interface RuleOptions {
  label?: string
}

type ValidationObject = Record<string, { rules: (Rules | RuleCustom)[]; options?: RuleOptions }>

const libs = {
  required: (key: string, value: any, opts?: RuleOptions) => {
    if (!value) return `${opts?.label || key} is required!`
  }
}

class Validator {
  data: ValidationObject
  errors: Error[] = []
  valids: Valid[] = []

  constructor() {
    this.data = {}
  }

  schema(data: ValidationObject) {
    this.data = data

    return this
  }

  createRules(
    array: (Rules | RuleCustom)[],
    opts?: RuleOptions
  ): { rules: (Rules | RuleCustom)[]; options?: RuleOptions } {
    return { rules: array, options: opts }
  }

  private filterInputs(inputs: Record<string, any>, keys?: string[]) {
    let filtered = inputs

    if (keys) {
      filtered = Object.keys(inputs)
        .filter((key) => keys.includes(key))
        .reduce((obj: any, key) => {
          obj[key] = inputs[key]

          return obj
        }, {})
    }

    return filtered
  }

  private setError(error: string, key: string, rule: string) {
    const index = this.errors.findIndex((item) => item.key === key)

    const item = {
      key,
      messages: [
        {
          validation: rule,
          message: error
        }
      ]
    }

    if (index < 0) {
      this.errors.push(item)
    } else {
      this.errors[index] = {
        ...this.errors[index],
        messages: [...this.errors[index].messages, ...item.messages]
      }
    }
  }

  private setValid(key: string, validations: string[]) {
    const index = this.valids.findIndex((item) => item.key === key)

    const item: Valid = {
      key,
      validations
    }

    if (index < 0) {
      this.valids.push(item)
    } else {
      this.valids[index] = {
        ...this.valids[index],
        validations: [...this.valids[index].validations, ...item.validations]
      }
    }
  }

  validate(inputs: Record<string, any>, keys?: string[]) {
    const filtered = this.filterInputs(inputs, keys)

    this.errors = []
    this.valids = []

    Object.entries(filtered).forEach((input) => {
      const [key, val] = input

      if (key in this.data) {
        const { rules, options } = this.data[key]

        const validations: string[] = []
        let isValid = true

        rules.forEach((validation) => {
          let error = null
          let rule: string = ''

          if (typeof validation === 'string') {
            rule = validation
            error = libs[validation as Rules](key, val, options)
          } else if (typeof validation === 'object') {
            const custom = validation as unknown as RuleCustom

            rule = custom.rule
            error = custom.handler(key, val, options)
          }

          validations.push(rule)

          if (error) {
            isValid = false

            this.setError(error, key, rule)
          }
        })

        if (isValid) this.setValid(key, validations)
      }
    })

    return { errors: this.errors, valids: this.valids }
  }
}

export default new Validator()
